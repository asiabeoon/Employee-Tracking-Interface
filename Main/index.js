const inquirer = require('inquirer');
const { table } = require('table');

const menu = function () {
  console.log("Do stuff after!");
}



  //Responses for when a Prompt is selected
  // View All Employees


  

  
//     askQuestions()

// const config = {
//   border: {
//     topBody: `─`,
//     topJoin: `┬`,
//     topLeft: `┌`,
//     topRight: `┐`,

//     bottomBody: `─`,
//     bottomJoin: `┴`,
//     bottomLeft: `└`,
//     bottomRight: `┘`,

//     bodyLeft: `│`,
//     bodyRight: `│`,
//     bodyJoin: `│`,

//     joinBody: `─`,
//     joinLeft: `├`,
//     joinRight: `┤`,
//     joinJoin: `┼`
//   }
// };

// async function showTable (data){
//   let tableData = [];
//   // option 1 fancy one line table data format
//   tableData = [
//     //column
//     Object.keys(data[0]), 
//     //values
//     ...data.map(val => Object.values(val))];

//   // // option 2 for tables, using basic for loop and starter array
//   // tableData = [Object.keys(data[0])];
//   // for(var i = 0; i< data.length; i++){
//   //   tableData.push(Object.values(data[i]));
//   // }

//   // prompt is a promise based function
//   const answers = await inquirer.prompt([
//     {
//       message: "\n" + table(tableData, config),
//       type: 'input',
//       name: 'name'
//     }
//   ]);
// }

// const dbData = [
//   { id: 1, name: "Anthony"},
//   { id: 2, name: "Myself"},
//   { id: 3, name: "Turtle"},
// ];

// const init = async function(){
//   // show table is an async function which will look like a promise in console
//   // if we print
//   await showTable(dbData);
//   menu();
// }

// init();
