DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Table for Company departments
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

  /* course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  instructor_id INT,
  FOREIGN KEY (instructor_id)
  REFERENCES instructors(id)
  ON DELETE SET NULL,
  PRIMARY KEY(id) */


-- Table for Company titles
CREATE TABLE company_titles (
  id INT AUTO_INCREMENT NOT NULL,
  title_id INT,
  titles VARCHAR(100) NOT NULL,
  /* course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  instructor_id INT,*/
  FOREIGN KEY (title_id)
  /* REFERENCES instructors(id) */
  ON DELETE SET NULL,
  PRIMARY KEY(id) 
);

-- Table of employees
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    manager VARCHAR(30) NOT NULL
  PRIMARY KEY(id)
);




