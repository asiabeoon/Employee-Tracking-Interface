USE employee_db;

SELECT * FROM departments;

SELECT * FROM company_titles;

SELECT * FROM employees_info;

SELECT employees_info.employee_id, employees_info.firstName, employees_info.lastName, company_titles.titles, departments.department_name, employees_info.salary, employees_info.manager
FROM employees_info
JOIN company_titles
ON employees_info.title_id = company_titles.title_id
JOIN departments
ON employees_info.department_id = departments.department_id;