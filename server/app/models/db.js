const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const Voter = require("../controllers/voters.controller.js");

const host = dbConfig.HOST;
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
  console.log("Host name is: "+dbConfig.HOST)
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  connection.query("DELETE FROM voters WHERE VoterID NOT IN ('12345')");
  Voter.adminAccountadd()
  .then(accountList => {
    console.log(accountList);
    connection.query(
      "UPDATE voters set public_key = ? WHERE VoterID = '12345'", 
      [accountList[0]], 
      (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Update successful');
        }
      }
    );
  })
  .catch(error => {
    console.error(error);
  });
});
}
catch(err) {
  console.log("ERRoR is " +err)
}

module.exports = connection;