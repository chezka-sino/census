$(function(){
    var report_template = _.template($('#report-template').html());

    window.removeColumn = function() {
        geoid = $(this).attr('data-val');

        // First item in list
        if (document.location.pathname.indexOf('/' + geoid + ',') > 0) {
            document.location.pathname = document.location.pathname.replace('/' + geoid + ',', '/');
        // Any other item in list
        } else {
            document.location.pathname = document.location.pathname.replace(',' + geoid, '');
        }
    }
    
    window.twistRow = function() {
        var show_child = $(this).is('.closed');
        twistRowHelper($(this), show_child);
        $(this).toggleClass('closed')
        $(this).toggleClass('open');
    }
    
    window.twistRowHelper = function(parent_row, show_me) {
        $.each($('tr[parent=' + $(parent_row).attr('id') + ']'), function(index, value){
            if(show_me){
                $(value).show();
            } else {
                $(value).hide();
            }

            var show_child = false;
            if($(value).is(':visible') && $(value).is('.has-children.open')) {
                show_child = true;
            }

            twistRowHelper(value, show_child);
        });
    }
    
    window.addRelatedState = function() {
        this_geoid = $(this).attr('data-val');
        state_geoid = this_geoid.slice(0,2);
        
        window.location.pathname = window.location.pathname.replace('.html', "," + state_geoid + '.html');
    }

    window.addRelatedCounty = function() {
        this_geoid = $(this).attr('data-val');
        county_geoid = this_geoid.slice(0,5);
        
        window.location.pathname = window.location.pathname.replace('.html', "," + county_geoid + '.html');
    }

    window.parseGeoids = function() {
        // Get url without hashbang
        var target = _.last(window.location.pathname.split("/"));

        // Ditch the .html
        target = _.first(target.split("."));

        // Split the list
        geoids = target.split(",");

        return geoids;
    }

    window.downloadData = function(format) {
        var url = "/data/" + window.geoids.join(",") + "." + format;

        if (window.location.hash != "") {
             url += "?tables=" + window.location.hash.substring(1);
        }   

        window.location = url;
    }

    window.loadLabels = function() {
        $("#ajax-loader").show();

        ire_census.do_with_labels(function(labels_data) {
            window.labels_data = labels_data;
            window.geoids = parseGeoids();

            window.tables = _.keys(labels_data["tables"])
            window.tables = _.sortBy(window.tables, ire_census.table_comparator);

            _.each(window.tables, function(table) {
                var elem = $('<div id="report-wrapper-' + table + '"></div>');
                $('#reports').append(elem);
            });

            geographies = new Array();

            _.each(geoids, function(geoid) {
                ire_census.do_with_sf1_data(geoid,function(geography_data) {
                    geographies.push(geography_data);

                    // If all geographies have been loaded, make reports
                    if (geographies.length == geoids.length) {
                        // Sort geographies by url order since the return order isn't deterministic
                        window.geographies = _.sortBy(geographies, function(geography) {
                            return _.indexOf(geoids, geography["geoid"]);
                        });

                        // Browser handles displaying reports
                        $("#ajax-loader").hide();
                        window.startBrowser();
                    }
                });
            });
        });
    }

    window.makeReport = function(table, labelset, geoids, geographies) {
        var report = {
            'key': labelset["key"],
            'name': labelset['name'],
            'table': labelset["key"] + ". " + labelset['name'],
            'universe': labelset['universe'],
            'columns': [],
            'rows': [],
            'geog_names': []
        };

        var labels = _.sortBy(labelset["labels"], function(label) {
            return label["key"];
        });

        _.each(labels, function(label) {
            row = {
                "key": label["key"],
                "label": label,
                "data": [] 
            }

            _.each(geographies, function(geography) {
                var d = new Object();

                _.each(["2000", "2010", "delta", "pct_change"], function(year) {
                    try {
                        d[year] = geography["data"][year][table][label["key"]];
                    } catch(err) {
                    }
                });

                row["data"].push(d);
            });

            report["rows"].push(row);
        });

        _.each(geographies, function(geography) {
            var column_meta = {};
            column_name = geography["metadata"]["NAME"];
            report['geog_names'].push(column_name);
            if ($.inArray(geography["sumlev"], [SUMLEV_COUNTY, SUMLEV_COUNTY_SUBDIVISION, SUMLEV_PLACE, SUMLEV_TRACT]) >= 0) {
                state_fips = geography["metadata"]["STATE"];
                state_name = _.detect(window.query.mappings.states, function(state) {
                    return state[1] == state_fips;
                })[0];
                column_name += ", " + state_name; 
            }

            column_meta["name"] = column_name;
            column_meta["geoid"] = geography["geoid"];
            column_meta["sumlev"] = geography["sumlev"];

            report["columns"].push(column_meta);
        });

        report["geoids"] = geoids;
        report["show_remove_button"] = (geoids.length > 1);

        return report;
    }

    window.floatFormat = function(n, decimals) {
        if (_.isString(n)) {
            try {
                n = parseFloat(n);
            } catch(err) {
                return "";
            }
        }

        if (_.isUndefined(n) || _.isNaN(n)) {
            return "";
        }

        if (_.isUndefined(decimals)) {
            decimals = 2;
        }

        s = n.toFixed(decimals);

        return s 
    }

    window.toPercent = function(n) {
        if (_.isString(n)) {
            try {
                n = parseFloat(n);
            } catch(err) {
                return "";
            }
        }

        if (_.isUndefined(n) || _.isNaN(n)) {
            return "";
        }

        return n * 100;
    }

    window.intComma = function(n) {
        // Algorithm from Django template tags
        // http://code.djangoproject.com/svn/django/trunk/django/contrib/humanize/templatetags/humanize.py
        if (_.isUndefined(n) || _.isNaN(n)) {
            return "";
        }

        orig = n
        n = n.toString().replace(/^(-?\d+)(\d{3}\.?\d*)/g, "$1,$2");

        if (n == orig) {
            return n;
        } else {
            return intComma(n);
        }
    }

    window.renderReport = function(report) {
        var html = report_template(report);

        $('#report-wrapper-' + report["key"]).append(html);
        var base = 'census.ire.org'
        var names = report['geog_names'].join(', ');
        var title = [names,base].join(' - ');
        $('title').html(title);
    }

    // Add event hooks
    $('.report .button.remove-column').live("click", removeColumn);
    $('.report tr.row').live("click", window.twistRow);
    $('.report .button.add-related-state').live("click", window.addRelatedState);
    $('.report .button.add-related-county').live("click", window.addRelatedCounty);
    $('nav .csv').live("click", function () { window.downloadData("csv"); });
    $('nav .json').live("click", function () { window.downloadData("json"); });
    $('nav .kml').live("click", function () { window.downloadData("kml"); });

    // Table mouseover row highlighting.
    $('.report td').live('mouseover mouseleave', function(e) {
        if (e.type == 'mouseover') {
            var status = '';
            $(this).addClass("selected");
            $(this).parent().addClass("highlight");
            status = $(this).parent().find('.label').text();
            if ($(this).index() > 0) {
                $("colgroup", $(this).parents("table")).eq($(this).index()).addClass("highlight"); //column
                try {
                    status += ', ' + $($(this).parents("table").find('.locationdef')[Math.ceil($(this).index()/4) - 1]).clone().find('*').remove().end().text().trim();
                    status += ', ' + $($(this).parents("table").find('.subhead')[$(this).index() - 1]).text().trim();
                } catch(e) {
                    // IE doesn't seem to like this?
                }
            }
            $('#status').show().text(status);
        } else {
            $(this).removeClass("selected");
            $(this).parent().removeClass('highlight');
            if ($(this).index() > 0)
                $("colgroup", $(this).parents("table")).eq($(this).index()).removeClass("highlight");
            $('#status').hide();
        }
    });

    // Kick-off
    loadLabels();
});
