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

INSERT INTO freundesliste VALUES
('Kevin01', 'admin'),
('Kevin01', 'Kevin02'),
('Kevin01', 'Kevin04'),
('Kevin01', 'Kevin06'),
('Kevin01', 'Kevin09');


INSERT INTO unterkategorie VALUES
('UK 1 zu IT-Management','IT-Management'),
('UK 2 zu IT-Management','IT-Management'),
('UK 1 zu Programmierung','Programmierung'),
('UK 2 zu Programmierung','Programmierung');

INSERT INTO frage(kategorie_name,unterkategorie_name,flagFragenTypMult,frage,antwortmoeglichkeit1,antwortmoeglichkeit2,antwortmoeglichkeit3,antwortmoeglichkeit4,wahrheitAntwortmoeglichkeit1,wahrheitAntwortmoeglichkeit2,wahrheitAntwortmoeglichkeit3,wahrheitAntwortmoeglichkeit4,flagFrageValidiert) VALUES
('IT-Management','UK 1 zu IT-Management',false,'Welche Gase wurden behandelt?','Exert','Inert','Exposé','Imposé',false,true,false,false,true),
('IT-Management','UK 2 zu IT-Management',true,'Was heißt/hieß RAID?','Redundant Array of Independent Devices','Redundant Array of Inexpensive Disks','Redundant Array of Independent Disks','Redundant Array of Inhuman Disks',false,true,true,false,true),
('IT-Management','UK 1 zu IT-Management',false,'Wie ist Datenschutz anzuwenden?','Erst dann, wenn es zu spät ist.','Nach dem ersten Datenschutzbruch','Präventiv','Gar nicht',false,false,true,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Was ist ein natives Sprachmittel in C', 'Listen', 'Queues','LinkedLists','Arrays',false,false,false,true,true),
('Programmierung', 'UK 2 zu Programmierung',false,'Welche Schleifen-Art gibt es in C++ nicht?', 'For', 'Do-Until','While','Do-While',false,true,false,false,true),
('Programmierung', 'UK 1 zu Programmierung',false,'Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?', 'mov bx,ax','cpy bx,ax', 'dup bx,ax','copy bx,ax',true,false,false,false,true);

INSERT INTO antwort VALUES
(7,41,'Kevin02',true,false,false,false,true,false),
(8,41,'Kevin02',false,true,false,false,true,false),
(9,41,'Kevin02',true,false,false,false,true,false),

(7,41,'Kevin01',false,true,false,false,true,true),
(8,41,'Kevin01',false,true,true,false,true,true),
(9,41,'Kevin01',false,false,true,false,true,true),

(10,42,'Kevin01',false,false,false,true,true,true),
(11,42,'Kevin01',false,true,false,false,true,true),
(12,42,'Kevin01',true,false,false,false,true,true),

(10,42,'Kevin02',false,false,false,true,true,true),
(11,42,'Kevin02',true,true,false,false,true,false),
(12,42,'Kevin02',true,false,false,false,true,true);