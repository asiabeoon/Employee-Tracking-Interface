const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 4444;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'LevelLove02!20!!',
    database: ''
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

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});