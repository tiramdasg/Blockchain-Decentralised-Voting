const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const host = process.env.HOSTDB || dbConfig.HOST;
// Create a connection to the database
const connection = mysql.createConnection({
  host: host,
  port: 3306,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
try {
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  connection.query("CREATE TABLE IF NOT EXISTS voters (`VoterID` int NOT NULL, `VoterName` varchar(45) NOT NULL, `Email` varchar(45) NOT NULL, `Password` varchar(100) DEFAULT NULL, `isAdmin` tinyint(1) DEFAULT NULL, `public_key` varchar(50) NOT NULL, `isAprroved` tinyint(1) DEFAULT NULL, PRIMARY KEY (`VoterID`))")
});
}
catch(err) {
  console.log("ERRoR is " +err)
}

module.exports = connection;