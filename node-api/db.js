require('dotenv').config();
const mysql = require('mysql2');

// MYSQL CONNECTION POOL
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  // TEST DB CONNECTION
db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
    connection.release();
  });

module.exports = db;