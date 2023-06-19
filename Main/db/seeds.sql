USE employee_db; 
INSERT INTO departments (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead",80000, 1 ),
       ("Salesperson", 90000, 1),
       ("Lead Engineer",100000, 2),
       ("Software Engineer",110000, 2),
       ("Account Manager",110000, 3 ),
       ("Accountant", 85000, 3),
       ("Legal Team Lead",120000, 4 ),
       ("Lawyer",140000, 4 );


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Jane', 'Doe', 1, 1),
 ('Joseph', 'Smith', 2, 1),
 ('Rich', 'Khan', 3, 2),
 ('Ashley', 'Letten', 4, 2),
 ('Eric', 'Sneed', 5, null),
 ('Beverly', 'Ellis', 6, 3),  
 ('Victor', 'Hannon', 7, null),   
 ('Sheila', 'Fonstein', 8, null);      
              