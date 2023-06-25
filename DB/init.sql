ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pass@1234';

flush privileges;

CREATE DATABASE dbtest1;

USE dbtest1;

CREATE TABLE voters (`VoterID` int NOT NULL, `VoterName` varchar(45) NOT NULL, `Email` varchar(45) NOT NULL, `Password` varchar(100) DEFAULT NULL, `isAdmin` tinyint(1) DEFAULT NULL, `public_key` varchar(50) NOT NULL, `isAprroved` tinyint(1) DEFAULT NULL, PRIMARY KEY (`VoterID`));

INSERT INTO voters (VoterID, VoterName, Email, Password, isAdmin, public_key, isAprroved)
VALUES (12345, 'Admin', 'admin@admin', '77365eb7bcf4e52685fffdebd62a3b9b122b1372bad75cf9aea556d7184d1aca', 1, 'admin', 1);