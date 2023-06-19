DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Table for Company departments
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);


-- Table for Company role
CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL,
   department_id INT,
   FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE
);

-- Table of employee
CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);





