require("dotenv").config();

const mysql = require("mysql2");
// Creates the connection to employees_tracker database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employees_tracker",
});

module.exports = connection;
