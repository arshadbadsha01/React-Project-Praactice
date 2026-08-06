const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  connectionLimit: 5,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("MYSQl connection failed:", err);
  } else {
    console.log("MYSQL Connected");
    connection.release();
  }
});

module.exports = db;
