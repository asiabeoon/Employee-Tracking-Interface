INSERT INTO departments (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO company_titles(title_id, title)
VALUES (1, "Sales Lead"),
       (2, "Salesperson"),
       (3, "Lead Engineer"),
       (4, "Software Engineer"),
       (5, "Account Manager"),
       (6, "Accountant"),
       (7, "Legal Team Lead"),
       (8, "Lawyer");


INSERT INTO employees (firstName, lastName, title, department, salary, manager)
VALUES (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       (1,'John', 'Doe', 'Salesperson', 'Sales', 90000, 'Benny'),
       (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       (1,'Jane', 'Doe', 'Salesperson', 'Sales', 80000, 'Benny'),
       ('Julie', 'Smite', 'Engineer', 'Engineering', 120000, 'Kerry Washington');      
              