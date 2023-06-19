const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const { table } = require('table');



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

  // {
  //   host: 'localhost', // 127.0.0.1 is another name for localhost
  //   // host: '127.0.0.1',
  //   user: 'root',
  //   password: '',
  //   database: 'classlist_db' // should exist
  // },
  console.log(`Connected to the database.`)
);

// Opening Header from https://www.npmjs.com/package/table

// const config = {
// columnDefault: {
//   width: 10,
// },
// header: {
//   alignment: 'center',
//   content: 'EMPLOYEE MANAGER',
// },
// }

// console.log(table(config));

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// Created an array of questions for user input using example from ReadMe Generator

// Start Inquirer Prompts
const userPrompts = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'What would you like to do? (Use arrow Keys)',
          choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
            ]
        }
      ])
    
    .then((answers) => {
      const {choices} = answers;
  
        if (choices === 'View All Employees') {
            viewAllEmployees();
        }
        
        if (choices === 'Add Employee') {
          addEmployee();
        }
  
        if (choices === 'Update Employee Role') {
          updateEmployeeRole();
        }
  
        if (choices === 'View All Roles') {
          viewAllRoles();
        }
  
        if (choices === 'Add Role') {
          addRole();
        }
  
        if (choices === 'View All Departments') {
          viewAllDepartments();
        }
  
        if (choices === 'Add Department') {
          addDepartment();
        }
  
        if (choices === 'Quit') {
            connection.end();
        }
      
    })
  };

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
  



userPrompts()


// 
// const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
// // Change [ into Inquirer prompt]
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
  
// const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
// // Change [ into Inquirer prompt]
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
