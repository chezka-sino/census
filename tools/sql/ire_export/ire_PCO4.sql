-- PCO4. GROUP QUARTERS POPULATION IN JUVENILE FACILITIES BY SEX BY AGE
-- designed to work with the IRE Census bulk data exports
-- see http://census.ire.org/data/bulkdata.html
CREATE TABLE ire_pco4 (
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
	pco004001 INTEGER, 
	pco004001_2000 INTEGER, 
	pco004002 INTEGER, 
	pco004002_2000 INTEGER, 
	pco004003 INTEGER, 
	pco004003_2000 INTEGER, 
	pco004004 INTEGER, 
	pco004004_2000 INTEGER, 
	pco004005 INTEGER, 
	pco004005_2000 INTEGER, 
	pco004006 INTEGER, 
	pco004006_2000 INTEGER, 
	pco004007 INTEGER, 
	pco004007_2000 INTEGER, 
	pco004008 INTEGER, 
	pco004008_2000 INTEGER, 
	pco004009 INTEGER, 
	pco004009_2000 INTEGER, 
	pco004010 INTEGER, 
	pco004010_2000 INTEGER, 
	pco004011 INTEGER, 
	pco004011_2000 INTEGER, 
	pco004012 INTEGER, 
	pco004012_2000 INTEGER, 
	pco004013 INTEGER, 
	pco004013_2000 INTEGER, 
	pco004014 INTEGER, 
	pco004014_2000 INTEGER, 
	pco004015 INTEGER, 
	pco004015_2000 INTEGER, 
	pco004016 INTEGER, 
	pco004016_2000 INTEGER, 
	pco004017 INTEGER, 
	pco004017_2000 INTEGER, 
	pco004018 INTEGER, 
	pco004018_2000 INTEGER, 
	pco004019 INTEGER, 
	pco004019_2000 INTEGER, 
	pco004020 INTEGER, 
	pco004020_2000 INTEGER, 
	pco004021 INTEGER, 
	pco004021_2000 INTEGER, 
	pco004022 INTEGER, 
	pco004022_2000 INTEGER, 
	pco004023 INTEGER, 
	pco004023_2000 INTEGER, 
	pco004024 INTEGER, 
	pco004024_2000 INTEGER, 
	pco004025 INTEGER, 
	pco004025_2000 INTEGER, 
	pco004026 INTEGER, 
	pco004026_2000 INTEGER, 
	pco004027 INTEGER, 
	pco004027_2000 INTEGER, 
	pco004028 INTEGER, 
	pco004028_2000 INTEGER, 
	pco004029 INTEGER, 
	pco004029_2000 INTEGER, 
	pco004030 INTEGER, 
	pco004030_2000 INTEGER, 
	pco004031 INTEGER, 
	pco004031_2000 INTEGER, 
	pco004032 INTEGER, 
	pco004032_2000 INTEGER, 
	pco004033 INTEGER, 
	pco004033_2000 INTEGER, 
	pco004034 INTEGER, 
	pco004034_2000 INTEGER, 
	pco004035 INTEGER, 
	pco004035_2000 INTEGER, 
	pco004036 INTEGER, 
	pco004036_2000 INTEGER, 
	pco004037 INTEGER, 
	pco004037_2000 INTEGER, 
	pco004038 INTEGER, 
	pco004038_2000 INTEGER, 
	pco004039 INTEGER, 
	pco004039_2000 INTEGER, 
	PRIMARY KEY (geoid)
);
