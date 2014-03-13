USE studiduell;

INSERT INTO Kategorie
	VALUES
	('IT-Management'),
	('Logik und Algebra'),
	('Programmierung'),
	('Projektmanagement'),
	('Wissenschaftliches Arbeiten');


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
('UK 2 zu Programmierung','Programmierung');

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
('Programmierung', 'UK 2 zu Programmierung',false,'Was ist richtiger JAVAScript-Code', '<script type="text/javascript">document.getElementById("kategorieDiv").css("visibility","hidden");</script>', '<script type="text/javascript">$("#kategorieDiv").css("visibility","hidden");</script>','<script type="text/javascript">document.getElementById("antwort1").css("visibility","hidden");</script>', '<script type="text/javascript">$("#antwort1").css("visibility","hidden");</script>',true,true,true,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'TestAlert', '<script>alert("Hallo Sie wurden gehäckt")</script>', 'false','false','false',false,false,false,false,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Alles ist falsch. Bitt drücken Sie auf weiter', 'false', 'false','false','false',false,false,false,false,true);


INSERT INTO Spiel VALUES
(1,'M','Kevin02','Kevin01',null,null,'Kevin01',1,'P','2014-02-18 17:10:47');

INSERT INTO Runde VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,1,5),
(6,1,6);

INSERT INTO Antwort VALUES
(1,1,'Kevin02',true,false,false,false,true,false),
(2,1,'Kevin02',false,true,false,false,true,false),
(3,1,'Kevin02',true,false,false,false,true,false),

(1,1,'Kevin01',false,true,false,false,true,true),
(2,1,'Kevin01',false,true,true,false,true,true),
(3,1,'Kevin01',false,false,true,false,true,true),

(4,2,'Kevin01',false,false,false,true,true,true),
(5,2,'Kevin01',false,true,false,false,true,true),
(6,2,'Kevin01',true,false,false,false,true,true),

(4,2,'Kevin02',false,false,false,true,true,true),
(5,2,'Kevin02',true,true,false,false,true,false),
(6,2,'Kevin02',true,false,false,false,true,true);