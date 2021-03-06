#!/usr/bin/env python

import sys

from csvkit.unicsv import UnicodeCSVReader

import config
import utils

if len(sys.argv) < 2:
    sys.exit('You must provide the filename of a CSV as an argument to this script.')

FILENAME = sys.argv[1]

collection = utils.get_geography_collection()

with open(FILENAME) as f:
    rows = UnicodeCSVReader(f)
    headers = rows.next()

    inserts = 0
    updates = 0
    row_count = 0

    for row in rows:
        row_count += 1

        geography = {
            #'sumlev': '',
            #'geoid': '',
            #'metadata': {},
            #'xrefs': [],
            #'data': {}
            #'xwalk': {}
        }
        row_dict = dict(zip(headers, row))

        if row_dict['SUMLEV'] not in config.SUMLEVS:
            continue

        # Ignore that is not for complete geographies
        if row_dict['GEOCOMP'] != config.GEOCOMP_COMPLETE:
            continue

        if not config.filter_geographies(row_dict):
            continue

        geography['sumlev'] = row_dict.pop('SUMLEV')
        geography['geoid'] = utils.GEOID_COMPUTERS[geography['sumlev']](row_dict)

        xref = utils.xref_from_row_dict(row_dict) 

        existing = collection.find_one(geography)
        if existing:
            if xref not in existing['xrefs']:
                existing['xrefs'].append(xref)
                collection.save(existing)

                updates += 1

            continue

        geography['xrefs'] = [xref]
        geography['data'] = {}
        geography['metadata'] = row_dict

        collection.save(geography, safe=True)
        inserts += 1

print 'File: %s' % FILENAME
print ' Row count: %i' % row_count
print ' Inserted: %i' % inserts
print ' Updated: %i' % updates

