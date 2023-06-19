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


//   Functions to view departments
  function viewAllDepartments(){
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        userPrompts()
         });
  }

  function viewAllRoles(){
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        userPrompts()
         });
  }

  function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        userPrompts()
         });
  }


  //  Functions to Update employee Data --This works---
const updateEmployeeRole = () => {
    inquirer.prompt([
      {
        name: 'employeeName',
        type: 'input',
        message: 'Enter the name of the employee whose role you want to update:',
      },
      {
        name: 'newRole',
        type: 'input',
        message: 'Enter the name of the new role:',
      },
    ])
    .then((answers) => {
      const { employeeName, newRole } = answers;
      const sql = `
        SELECT id
        FROM role
        WHERE title = ?;
      `;
// Following Code created with the assistance of CHAT GPT by 
      connection.query(sql, newRole, (error, results) => {
        if (error) throw error;
        const roleId = results[0].id;
        const updateSql = `
          UPDATE employee
          SET role_id = ?
          WHERE CONCAT(first_name, ' ', last_name) = ?;
        `;
        connection.query(updateSql, [roleId, employeeName], (error, results) => {
          if (error) throw error;
          console.log(`${results.affectedRows} employee updated`);
          userPrompts();
        });
      });
    });
  };

 // Function to add a role
const addRole = () => {
    // Query the departments table for department names to use in role creation prompt
    const query = `SELECT department_name FROM departments`;
    db.query(query, (err, results) => {
      if (err) throw err;
      // Transform the results into an array of department names for use in the Inquirer prompt
      const departmentChoices = results.map(({  department_name }) => ({
        name: department_name
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
          name: 'department',
          type: 'list',
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
       
// Function to Add employee
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



