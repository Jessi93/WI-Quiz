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