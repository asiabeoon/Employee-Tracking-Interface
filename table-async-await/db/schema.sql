DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;


CREATE TABLE instructors (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  active BOOLEAN NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  instructor_id INT,
  FOREIGN KEY (instructor_id)
  REFERENCES instructors(id)
  ON DELETE SET NULL,
  PRIMARY KEY(id)
);

CREATE TABLE students (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  active BOOLEAN NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE classrooms (
  id INT NOT NULL AUTO_INCREMENT,
  building_name VARCHAR(30) NOT NULL,
  room_number INT NOT NULL,
  available BOOLEAN NOT NULL,
  date_updated DATETIME NOT NULL,
  PRIMARY KEY (id)
);
