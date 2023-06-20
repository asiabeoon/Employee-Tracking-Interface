const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const {table}  = require('table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'LevelLove02!20!!',
    database: 'employee_db'
  },


  console.log(`Connected to the database.`)
);

// Add Opening Header from https://www.npmjs.com/package/table


// Start Inquirer Prompts
const userPrompts = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'What would you like to do? (Use arrow Keys)',
          choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Remove Department',
            'Remove Role',
            'Remove Employee',
            'Quit'
            ]
        }
      ])
    
    .then((answers) => {
      const {choices} = answers;

        if (choices === 'View All Departments') {
        viewAllDepartments();
         }

        if (choices === 'Add Department') {
        addDepartment();
        }

        if (choices === 'View All Roles') {
            viewAllRoles();
          }
    
        if (choices === 'Add Role') {
            addRole();
          }
  
        if (choices === 'View All Employees') {
            viewAllEmployees();
        }
        
        if (choices === 'Add Employee') {
          addEmployee();
        }
  
        if (choices === 'Update Employee Role') {
          updateEmployeeRole();
        }
  
        if (choices === 'Remove Department') {
          removeDepartment();
        }
  
        if (choices === 'Remove Role') {
            removeRole();
          }

        if (choices === 'Remove Employee') {
            removeEmployee();
          }
    
        if (choices === 'Quit') {
            connection.end();
        }
      
    })
  };
  
userPrompts()


//** / Functions to view departments --This works
  function viewAllDepartments(){
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        userPrompts()
         });
  }
  const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, departments.department_name, role.salary 
                 FROM role 
                 JOIN departments ON role.department_id = departments.id`;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const data = [["ID", "Title", "Department", "Salary"]];
        result.forEach((role) => {
          data.push([role.id, role.title, role.department_name, role.salary]);
        });
        const output = table(data);
        console.log(output);
        userPrompts();
      }
    });
  };
  
  function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        userPrompts()
         });
  }

//**/ To add a new department
 const addDepartment = () => {
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the department you want to add?",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter a department name!");
            return false;
          }
        },
      })
      .then((answer) => {
        const query = `INSERT INTO departments (department_name) VALUES ("${answer.departmentName}")`;
        db.query(query, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${answer.departmentName} has been added to departments.`);
          }
          userPrompts();
        });
      });
  };
  


  // Womp womp doesn't work Functions to Update employee Role 
  const updateEmployeeRole = () => {
    // Step 1: Query the database
    const sql = `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title AS current_role, role.role_id FROM employee
                LEFT JOIN role ON employee.role_id = role.role_id`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
  
      const employees = rows.map(({ employee_id, first_name, last_name, current_role, role_id }) => ({
        name: `${first_name} ${last_name} (Current Role: ${current_role})`,
        value: { employee_id, role_id }
      }));
  
      const roles = [...new Set(rows.map(({ title, role_id }) => ({ name: title, value: role_id })))];
  
      // Step 2: Prompt the user
      const questions = [
        {
          name: 'employee',
          type: 'list',
          message:  'Which employee\'s role would you like to update?',
          choices: employees
        },
        {
          name: 'role',
          type: 'list',
          message: 'Which role do you want to assign to the selected employee?',
          choices: roles
        }
      ];
  
      inquirer.prompt(questions)
        .then(({ employee, role }) => {
          // Step 4: Update the employee's role
          const { employee_id } = employee;
          const { value: role_id } = role;
          const sql = `UPDATE employee SET role_id = ? WHERE employee_id = ?`;
          db.query(sql, [role_id, employee_id], (err, result) => {
            if (err) throw err;
  
            // Step 5: Display a message confirming the update
            console.log(`Successfully updated employee role!`);
            userPrompts();
          });
        });
    });
  };
  

 // Womp womp this doesn't work Function to add a role--
const addRole = () => {
    // Query the departments table for department names to use in role creation prompt
    const query = `SELECT department_name FROM departments`;
    db.query(query, (err, results) => {
      if (err) throw err;
      
      // ***Transform the results into an array of department names for use in the Inquirer prompt
      const departmentChoices = results.map(({  name: {title}, department_id }) => ({
        name: department_name,
        department_id

      }));
      // Inquirer prompts for role information
      inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:'
        },
        {
          name: 'salary',
          type: 'number',
          message: 'Enter the salary for this role:'
        },
        {
            // ****
          name: 'department',
          type: 'input',
          message: 'Choose the department for this role:',
          choices: departmentChoices
        }
      ])
      .then((answers) => {
        // Insert the new role into the roles table
        const query = `INSERT INTO role SET ?`;
        const { title, salary, department } = answers;
        const newRole = { title, salary, department_id: department };
        db.query(query, newRole, (err, result) => {
          if (err) throw err;
          console.log(`\n${result.affectedRows} New role added successfully!\n`);
          // Call the user prompts function again
          userPrompts();
        });
      });
    });
  };
       
// * Function to Add employee ---
const addEmployee = () => {
    // Get role information to generate choices for inquirer prompt
    let rolesList = [];
    db.query(`SELECT * FROM role`, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      // Push each role title and id to rolesList array
      rows.forEach((role) => {
        rolesList.push({
          name: role.title,
          value: role.id
        });
      });
      // Get manager information to generate choices for inquirer prompt
      let managersList = [];
      db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        // Push each employee name and id to managersList array
        rows.forEach((employee) => {
          managersList.push({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          });
        });
        managersList.push({
          name: "None",
          value: null
        });
        // Prompt user for new employee information
        inquirer.prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: rolesList
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managersList
          },
        ]).then((answers) => {
    
    // Add new employee to database
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [answers.firstName, answers.lastName, answers.role, answers.manager],
            (err, rows) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`Added ${answers.firstName} ${answers.lastName} to the database!`);
              userPrompts();
            });
        });
      });
    });
  };


