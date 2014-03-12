CREATE SCHEMA studiduell;

USE studiduell;

CREATE TABLE Benutzer (
    	benutzername VARCHAR(50) PRIMARY KEY, -- TODO or varbinary?
    	passwortHash CHAR(32) NOT NULL,
    	pushId VARCHAR(100),
    	letzteAktivitaet TIMESTAMP NOT NULL
);

CREATE TABLE Freundesliste (
	benutzername VARCHAR(50),
	befreundetMit VARCHAR(50),
	
	PRIMARY KEY(benutzername, befreundetMit),
	FOREIGN KEY(benutzername) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(befreundetMit) REFERENCES Benutzer(benutzername)
);

CREATE TABLE Spielstatus (
	name CHAR PRIMARY KEY
);

CREATE TABLE Spieltyp (
	name CHAR PRIMARY KEY
);

CREATE TABLE Studiengang (
	name VARCHAR(40) PRIMARY KEY
);

CREATE TABLE Kategorie (
	name VARCHAR(50) PRIMARY KEY
);


CREATE TABLE Unterkategorie (
	name VARCHAR(50),
	kategorieName VARCHAR(50),
	PRIMARY KEY (name,kategorieName),
	FOREIGN KEY(kategorieName) REFERENCES Kategorie(name) 
);

CREATE TABLE KategorieStudiengangMapping (
	kategorieName VARCHAR(50),
	studiengangName VARCHAR(40),
	
	PRIMARY KEY(kategorieName, studiengangName),
	FOREIGN KEY(kategorieName) REFERENCES Kategorie(name),
	FOREIGN KEY(studiengangName) REFERENCES Studiengang(name)
);

CREATE TABLE Kategorienfilter (
	benutzername VARCHAR(50),
	kategorieName VARCHAR(50),
	kategorieAusgewaehltCheck BOOLEAN NOT NULL DEFAULT TRUE,
	
	PRIMARY KEY(benutzername, kategorieName),
	FOREIGN KEY(benutzername) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(kategorieName) REFERENCES Kategorie(name)
);

CREATE TABLE Spiel (
	spielID INTEGER PRIMARY KEY AUTO_INCREMENT,
	spieltypName CHAR NOT NULL,
	spieler1 VARCHAR(50) NOT NULL,
	spieler2 VARCHAR(50) NOT NULL,
	sieger VARCHAR(50),
	verlierer VARCHAR(50),
	wartenAuf VARCHAR(50) NOT NULL,
	aktuelleRunde INTEGER NOT NULL,
	spielstatusName CHAR NOT NULL,
	letzteAktivitaet TIMESTAMP NOT NULL,
	
	FOREIGN KEY(spieltypName) REFERENCES Spieltyp(name),
	FOREIGN KEY(spieler1) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(spieler2) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(sieger) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(verlierer) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(wartenAuf) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(spielstatusName) REFERENCES Spielstatus(name)
);

CREATE TABLE Runde (
	rundenID INTEGER PRIMARY KEY AUTO_INCREMENT,
	spielID INTEGER NOT NULL,
	rundenNr INTEGER NOT NULL,
	
	FOREIGN KEY(spielID) REFERENCES Spiel(spielID)
);

CREATE TABLE Frage (
	fragenID INTEGER PRIMARY KEY AUTO_INCREMENT,
	kategorieName VARCHAR(50) NOT NULL,
	unterkategorieName VARCHAR(50),
	flagFragenTypMult BOOLEAN NOT NULL,
	frage VARCHAR(100) UNIQUE NOT NULL,
	antwortmoeglichkeit1 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit2 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit3 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit4 VARCHAR(50) NOT NULL,
	wahrheitAntwortmoeglichkeit1 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit2 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit3 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit4 BOOLEAN NOT NULL,
	flagFrageValidiert BOOLEAN NOT NULL,
	
	FOREIGN KEY(kategorieName) REFERENCES Kategorie(name),
	FOREIGN KEY(unterkategorieName) REFERENCES Unterkategorie(name)
);

CREATE TABLE Antwort (
	fragenID INTEGER NOT NULL,
	rundenID INTEGER NOT NULL,
	benutzername VARCHAR(50) NOT NULL,
	antwortmoeglichkeit1Check BOOLEAN NOT NULL,
	antwortmoeglichkeit2Check BOOLEAN NOT NULL,
	antwortmoeglichkeit3Check BOOLEAN NOT NULL,
	antwortmoeglichkeit4Check BOOLEAN NOT NULL,
	flagFrageAngezeigt BOOLEAN NOT NULL,
	ergebnisCheck BOOLEAN,
	
	PRIMARY KEY(fragenID, rundenID, benutzername),
	FOREIGN KEY(fragenID) REFERENCES Frage(fragenID),
	FOREIGN KEY(rundenID) REFERENCES Runde(rundenID),
	FOREIGN KEY(benutzername) REFERENCES Benutzer(benutzername)
);


/* User creation */
CREATE USER 'studiduell'@'localhost' IDENTIFIED BY 'development';

GRANT SELECT, INSERT, UPDATE, DELETE ON studiduell .* TO 'studiduell'@'localhost';


/* Insertions of constant values, such as enum types. */
INSERT INTO Spielstatus VALUES
	('A'), /* ACTIVE */
	('P'), /* PENDING */
	('C'), /* CLOSED */
	('D'), /* DECLINED */
	('Q'); /* QUIT (ABANDONED) */
INSERT INTO Spieltyp VALUES
	('M'), /* MULTI */
	('S'); /* SINGLE */