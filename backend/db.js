/*const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hadiyamk",        // your MySQL password
  database: "mern_db", // your database name
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected");
});

module.exports = db;*/



const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",         // your PostgreSQL username
  host: "localhost",
  database: "mern_db",      // your PostgreSQL DB name
  password: "",     // your PostgreSQL password
  port: 5432,               // default PostgreSQL port
});

// Test connection
db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = db;

