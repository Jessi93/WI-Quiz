CREATE USER 'studiduell'@'localhost' IDENTIFIED BY 'development';

GRANT SELECT, INSERT, UPDATE, DELETE ON studiduell .* TO 'studiduell'@'localhost';