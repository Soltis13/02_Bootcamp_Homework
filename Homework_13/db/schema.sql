-- Created the DB "burgers_db" (only works on local connections)
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burger_db;
USE burger_db;

-- Created the table "burger" 
CREATE TABLE burger (
  id int AUTO_INCREMENT,
  burger_name varchar(30) NOT NULL,
  devoured BOOLEAN NOT NULL,
  PRIMARY KEY(id)
);