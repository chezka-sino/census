-- P39I. FAMILY TYPE BY PRESENCE AND AGE OF RELATED CHILDREN (WHITE ALONE, NOT HISPANIC OR LATINO HOUSEHOLDER)
-- designed to work with the IRE Census bulk data exports
-- see http://census.ire.org/data/bulkdata.html
CREATE TABLE ire_p39i (
	geoid VARCHAR(11) NOT NULL, 
	sumlev VARCHAR(3) NOT NULL, 
	state VARCHAR(2) NOT NULL, 
	county VARCHAR(3), 
	cbsa VARCHAR(5), 
	csa VARCHAR(3), 
	necta VARCHAR(5), 
	cnecta VARCHAR(3), 
	name VARCHAR(90) NOT NULL, 
	pop100 INTEGER NOT NULL, 
	hu100 INTEGER NOT NULL, 
	pop100_2000 INTEGER, 
	hu100_2000 INTEGER, 
	p039i001 INTEGER, 
	p039i001_2000 INTEGER, 
	p039i002 INTEGER, 
	p039i002_2000 INTEGER, 
	p039i003 INTEGER, 
	p039i003_2000 INTEGER, 
	p039i004 INTEGER, 
	p039i004_2000 INTEGER, 
	p039i005 INTEGER, 
	p039i005_2000 INTEGER, 
	p039i006 INTEGER, 
	p039i006_2000 INTEGER, 
	p039i007 INTEGER, 
	p039i007_2000 INTEGER, 
	p039i008 INTEGER, 
	p039i008_2000 INTEGER, 
	p039i009 INTEGER, 
	p039i009_2000 INTEGER, 
	p039i010 INTEGER, 
	p039i010_2000 INTEGER, 
	p039i011 INTEGER, 
	p039i011_2000 INTEGER, 
	p039i012 INTEGER, 
	p039i012_2000 INTEGER, 
	p039i013 INTEGER, 
	p039i013_2000 INTEGER, 
	p039i014 INTEGER, 
	p039i014_2000 INTEGER, 
	p039i015 INTEGER, 
	p039i015_2000 INTEGER, 
	p039i016 INTEGER, 
	p039i016_2000 INTEGER, 
	p039i017 INTEGER, 
	p039i017_2000 INTEGER, 
	p039i018 INTEGER, 
	p039i018_2000 INTEGER, 
	p039i019 INTEGER, 
	p039i019_2000 INTEGER, 
	p039i020 INTEGER, 
	p039i020_2000 INTEGER, 
	PRIMARY KEY (geoid)
);