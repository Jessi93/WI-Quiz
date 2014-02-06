CREATE SCHEMA wi_quiz;

USE wi_quiz;

CREATE TABLE Benutzer (
    benutzername VARCHAR(50) PRIMARY KEY, -- TODO or varbinary?
    passwort_hash INTEGER NOT NULL, -- TODO data type as needed for hashing algorithm
	push_id VARCHAR(100),
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

CREATE TABLE Studiengang (
	name VARCHAR(40) PRIMARY KEY
);

CREATE TABLE Kategorie (
	name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Kategorie_Studiengang_Mapping (
	kategorie_name VARCHAR(50),
	studiengang_name VARCHAR(40),
	
	PRIMARY KEY(kategorie_name, studiengang_name),
	FOREIGN KEY(kategorie_name) REFERENCES Kategorie(name),
	FOREIGN KEY(studiengang_name) REFERENCES Studiengang(name)
);

CREATE TABLE Kategorienfilter (
	benutzername VARCHAR(50),
	kategorie_name VARCHAR(50),
	kategorieAusgewaehlt_Check BOOLEAN DEFAULT TRUE,
	
	PRIMARY KEY(benutzername, kategorie_name),
	FOREIGN KEY(benutzername) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(kategorie_name) REFERENCES Kategorie(name)
);

CREATE TABLE Spiel (
	spielID INTEGER PRIMARY KEY AUTO_INCREMENT,
	spieler1 VARCHAR(50) NOT NULL,
	spieler2 VARCHAR(50) NOT NULL,
	sieger VARCHAR(50),
	verlierer VARCHAR(50),
	wartenAuf VARCHAR(50) NOT NULL,
	aktuelleRunde INTEGER NOT NULL,
	spielstatus_name CHAR NOT NULL,
	letzteAktivitaet TIMESTAMP NOT NULL,
	
	FOREIGN KEY(spieler1) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(spieler2) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(sieger) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(verlierer) REFERENCES Benutzer(benutzername),
	FOREIGN KEY(wartenAuf) REFERENCES Benutzer(benutzername),
	/* FOREIGN KEY for aktuelleRunde afterwards - Runde does not exist*/
	FOREIGN KEY(spielstatus_name) REFERENCES Spielstatus(name)
);

CREATE TABLE Runde (
	rundenID INTEGER PRIMARY KEY AUTO_INCREMENT,
	spielID INTEGER NOT NULL,
	rundenNr INTEGER NOT NULL,
	
	FOREIGN KEY(spielID) REFERENCES Spiel(spielID)
);

ALTER TABLE Spiel ADD FOREIGN KEY(aktuelleRunde) REFERENCES Runde(rundenID);

CREATE TABLE Frage (
	fragenID INTEGER PRIMARY KEY AUTO_INCREMENT,
	kategorie_name VARCHAR(50) NOT NULL,
	flagFragenTypMult BOOLEAN NOT NULL,
	frage VARCHAR(100) NOT NULL,
	antwortmoeglichkeit1 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit2 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit3 VARCHAR(50) NOT NULL,
	antwortmoeglichkeit4 VARCHAR(50) NOT NULL,
	wahrheitAntwortmoeglichkeit1 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit2 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit3 BOOLEAN NOT NULL,
	wahrheitAntwortmoeglichkeit4 BOOLEAN NOT NULL,
	flagFrageValidiert BOOLEAN NOT NULL,
	
	FOREIGN KEY(kategorie_name) REFERENCES Kategorie(name)
);

CREATE TABLE Antwort (
	fragenID INTEGER,
	rundenID INTEGER,
	benutzername VARCHAR(50),
	antwortmoeglichkeit1_check BOOLEAN NOT NULL,
	antwortmoeglichkeit2_check BOOLEAN NOT NULL,
	antwortmoeglichkeit3_check BOOLEAN NOT NULL,
	antwortmoeglichkeit4_check BOOLEAN NOT NULL,
	flagFrageAngezeigt BOOLEAN NOT NULL,
	ergebnis_check BOOLEAN,
	
	PRIMARY KEY(fragenID, rundenID, benutzername),
	FOREIGN KEY(fragenID) REFERENCES Frage(fragenID),
	FOREIGN KEY(rundenID) REFERENCES Runde(rundenID),
	FOREIGN KEY(benutzername) REFERENCES Benutzer(benutzername)
);


/* Insertions of constant values, such as enum types. */
INSERT INTO Spielstatus VALUES
	('ACTIVE'),
	('PENDING'),
	('CLOSED'),
	('DECLINED');