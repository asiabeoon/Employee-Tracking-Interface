USE employee_db;

// SQL query to select all employees and their details
const sql = SELECT employee.employee_id,
 CONCAT(employee.first_name, ' ',
  employee.last_name) AS name, role.title, departments.department_name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id;
