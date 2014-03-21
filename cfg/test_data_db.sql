USE studiduell;

INSERT INTO Kategorie
	VALUES
	('IT-Management'),
	('Logik und Algebra'),
	('Programmierung'),
	('Projektmanagement'),
	('Wissenschaftliches Arbeiten'),
	('Business Intelligence');


INSERT INTO Benutzer VALUES
('admin', '5ebe2294ecd0e0f08eab7690d2a6ee69', NULL, '2014-02-18 17:10:47'),
('Kevin01', '5ebe2294ecd0e0f08eab7690d2a6ee69', 'hey', '2014-02-18 14:32:23'),
('Kevin02', '5ebe2294ecd0e0f08eab7690d2a6ee69', 'hey', '2014-02-18 14:31:53'),
('Kevin04', '1cb6a8079f36774dc559e7e56c474e37', NULL, '2014-02-16 22:53:10'),
('Kevin06', '5ebe2294ecd0e0f08eab7690d2a6ee69', 'hasdfey', '2014-02-18 14:56:32'),
('Kevin09', '5ebe2294ecd0e0f08eab7690d2a6ee69', NULL, '2014-02-18 15:26:44');

INSERT INTO Kategorienfilter VALUES
('admin', 'IT-Management', true),
('admin', 'Logik und Algebra', true),
('admin', 'Programmierung', true),
('admin', 'Projektmanagement', true),
('admin', 'Wissenschaftliches Arbeiten', true),
('Kevin01', 'IT-Management', true),
('Kevin01', 'Logik und Algebra', true),
('Kevin01', 'Programmierung', true),
('Kevin01', 'Projektmanagement', true),
('Kevin01', 'Wissenschaftliches Arbeiten', true),
('Kevin02', 'IT-Management', true),
('Kevin02', 'Logik und Algebra', true),
('Kevin02', 'Programmierung', true),
('Kevin02', 'Projektmanagement', true),
('Kevin02', 'Wissenschaftliches Arbeiten', true),
('Kevin04', 'IT-Management', true),
('Kevin04', 'Logik und Algebra', true),
('Kevin04', 'Programmierung', true),
('Kevin04', 'Projektmanagement', true),
('Kevin04', 'Wissenschaftliches Arbeiten', true),
('Kevin06', 'IT-Management', true),
('Kevin06', 'Logik und Algebra', true),
('Kevin06', 'Programmierung', true),
('Kevin06', 'Projektmanagement', true),
('Kevin06', 'Wissenschaftliches Arbeiten', true),
('Kevin09', 'IT-Management', true),
('Kevin09', 'Logik und Algebra', true),
('Kevin09', 'Programmierung', true),
('Kevin09', 'Projektmanagement', true),
('Kevin09', 'Wissenschaftliches Arbeiten', true);

INSERT INTO Freundesliste VALUES
('Kevin01', 'admin'),
('Kevin01', 'Kevin02'),
('Kevin01', 'Kevin04'),
('Kevin01', 'Kevin06'),
('Kevin01', 'Kevin09');


INSERT INTO Unterkategorie VALUES
('UK 1 zu IT-Management','IT-Management'),
('UK 2 zu IT-Management','IT-Management'),
('UK 1 zu Programmierung','Programmierung'),
('UK 2 zu Programmierung','Programmierung'),
('UK 1 zu Wissenschaftliches Arbeiten', 'Wissenschaftliches Arbeiten'),
('UK 2 zu Wissenschaftliches Arbeiten', 'Wissenschaftliches Arbeiten'),
('UK 1 zu Logik und Algebra', 'Logik und Algebra'),
('UK 2 zu Logik und Algebra', 'Logik und Algebra'),
('UK 1 zu Projektmanagement', 'Projektmanagement'),
('UK 2 zu Projektmanagement', 'Projektmanagement'),
('UK 1 zu Business Intelligence','Business Intelligence');

INSERT INTO Frage(kategorieName,unterkategorieName,flagFragenTypMult,frage,antwortmoeglichkeit1,antwortmoeglichkeit2,antwortmoeglichkeit3,antwortmoeglichkeit4,wahrheitAntwortmoeglichkeit1,wahrheitAntwortmoeglichkeit2,wahrheitAntwortmoeglichkeit3,wahrheitAntwortmoeglichkeit4,flagFrageValidiert) VALUES
('IT-Management','UK 1 zu IT-Management',false,'Welche Gase wurden behandelt?','Exert','Inert','Exposé','Imposé',false,true,false,false,true),
('IT-Management','UK 2 zu IT-Management',true,'Was heißt/hieß RAID?','Redundant Array of Independent Devices','Redundant Array of Inexpensive Disks','Redundant Array of Independent Disks','Redundant Array of Inhuman Disks',false,true,true,false,true),
('IT-Management','UK 1 zu IT-Management',false,'Wie ist Datenschutz anzuwenden?','Erst dann, wenn es zu spät ist.','Nach dem ersten Datenschutzbruch','Präventiv','Gar nicht',false,false,true,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Was ist ein natives Sprachmittel in C', 'Listen', 'Queues','LinkedLists','Arrays',false,false,false,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Welche Schleifen-Art gibt es in C++ nicht?', 'For', 'Do-Until','While','Do-While',false,true,false,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?', 'mov bx,ax','cpy bx,ax', 'dup bx,ax','copy bx,ax',true,false,false,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Wie sollen Variablen in Java deklariert werden?', 'CamelCase', 'nur Kleinbuchstaben','var b,','In einer eigenen Klasse',true,false,false,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Welche Code ist nicht richtig(JAVA)?', 'int b;','5 = int zahl;', 'int zahl,','int Antwort;',false,true,true,true,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Was ist richtig deklariert(JAVA)', 'public int getHallo() {return hallo;}', 'public void getHallo() {return hallo;}','public void setHallo() {return hallo;}','public void setHallo(int hallo) {this.hallo = hallo;}',true,false,false,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Mit Welchen Farben kann man alle anderen erstellen?', 'false', 'true','false','false',false,true,false,false,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Welche Personen haben Java entwickelt?', 'true', 'true','true','true',true,true,true,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Ergänze den folgenden Satz damit die Ausage stimmt: Die Antwort ist ...', 'false', 'true','true','false',false,true,true,false,true),
('Programmierung', 'UK 2 zu Programmierung',false,'So ein Mist', 'delete', 'wwer','wo','wann',false,true,false,false,false),
('Programmierung', 'UK 2 zu Programmierung',false,'Was ist richtiger JAVAScript-Code', 'a', 'b','c', 'd',true,true,true,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'TestAlert', 'dd', 'false','false','false',false,false,false,false,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Alles ist falsch. Bitt drücken Sie auf weiter', 'false', 'false','false','false',false,false,false,false,true),
('Wissenschaftliches Arbeiten', 'UK 1 zu Wissenschaftliches Arbeiten',false,'Wissenschaft', '1', '2','3','4',false,false,false,false,true),
('Wissenschaftliches Arbeiten', 'UK 2 zu Wissenschaftliches Arbeiten',false,'Wissenschaftliches Arbeiten 2', 'false', 'false','false','false',false,false,false,false,true),
('Wissenschaftliches Arbeiten', 'UK 2 zu Wissenschaftliches Arbeiten',false,'Was eine Wissenschaft dahinter :)', 'false', 'false','true','true',false,false,true,true,true),
('Logik und Algebra', 'UK 1 zu Logik und Algebra',true,'Stichwort Tautologie', 'allgemeingültig', 'Fisch','Joghurt','situationsbedingt',true,false,false,true,true),
('Logik und Algebra', 'UK 2 zu Logik und Algebra',true,'Macht den meisten Logik und Algebra Spaß', 'nein', 'ja','nein','nein',false,true,false,false,true),
('Logik und Algebra', 'UK 1 zu Logik und Algebra',true,'Da hat wohl einer Spaß am Anlegen von Testdaten', 'ganz bestimmt', 'das hier klicken','das nicht','super cool',false,true,false,false,true),
('Projektmanagement', 'UK 1 zu Projektmanagement',true,'Fand Person X Projektmanagment immer interessant?', 'klaro', 'mega','bisschen','gar nicht',false,false,true,false,true),
('Projektmanagement', 'UK 2 zu Projektmanagement',true,'Wer hat am wenigsten mit Projektmanagement zu tun?', 'Britney Spears', 'Luft','Manager','Senior Manager',false,true,false,false,true),
('Projektmanagement', 'UK 1 zu Projektmanagement',true,'Welchen Begriff gibt es im PM beim Berechnen von Puffern im Projekt?', 'rasante Linie', 'klarer Weg','kritischer Pfad','Höllenweg',false,false,true,false,true),
/* Phil's Fragen */
('Projektmanagement','UK 1 zu Projektmanagement',false,'Welche Projektphasen gibt es?','Projektsteuerung','PRojektanschluss','Projektabschuss','Projektstatus',true,false,false,false,true),
('Projektmanagement','UK 1 zu Projektmanagement',false,'Was kennzeichnet ein Projekt?','Gewisse Komplexität','Einzigartigkeit','Genialität','Internationalität',true,true,false,false,true),
('Projektmanagement','UK 1 zu Projektmanagement',false,'Was kennzeichnet einen Meilenstein','einschlägiges Ereignis','erster Monat vorbei','zwischen 2 Phasen','Beteiligung mehrerer Menschen',true,false,true,false,true),
('Projektmanagement','UK 1 zu Projektmanagement',false,'Für was steht ''EV'' im Projektmanagement?','Extrem Vegan','Earned Value','End Value','Elite Veterans',false,true,false,false,true),
('Projektmanagement','UK 1 zu Projektmanagement',false,'Für was steht PMO im Projektmanagement?','Project Management Onshore','Project Mastering Onshore','Project Management Office','Project Mission Office',false,false,true,false,true),
('Business Intelligence','UK 1 zu Business Intelligence',false,'Was heißt OLAP?','Online Analysis At Perfection','Online Analytical Processing','Offline Laverage Assessment Process','Offline Analytical Process',false,true,false,false,true),
('Business Intelligence','UK 1 zu Business Intelligence',false,'Was sind Hersteller von Business Intelligence Lösungen?','Siemens','SAP','Qlikview','HP',false,true,true,false,true),
('Business Intelligence','UK 1 zu Business Intelligence',false,'Für was steht DWH?','Data Warehouse','Datawall housing','Datawide House','HP',true,false,false,false,true),
('Business Intelligence','UK 1 zu Business Intelligence',false,'Was bezeichnet einen OLAP Operator?','Slice & Mice','Drill Up','Roll Down','Zoom in',false,true,false,false,true),
('Business Intelligence','UK 1 zu Business Intelligence',false,'Was sind Teildisziplinen des Data Mining?','Häufung(Clustering)','Assoziationsregeln','Business Analysis','OLAP',true,true,false,false,true);


INSERT INTO Spiel VALUES
(last_insert_id(),'M','Kevin02','Kevin01',null,null,'Kevin01',1,'P','2014-02-18 17:10:47');