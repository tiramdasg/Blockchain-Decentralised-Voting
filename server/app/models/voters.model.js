const sql = require("./db.js");

// constructor
const Voter = function(voter) {
  this.VoterName = voter.VoterName;
  this.VoterID = voter.VoterID;
  this.Email = voter.Email;
  this.Password = voter.Password;
  this.isAdmin = voter.isAdmin;
};

Voter.add = (newVoter, result) => {
  sql.query("INSERT INTO VOTERS SET ?", newVoter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Added Voter: ", { id: res.insertId, ...newVoter });
    result(null, { id: res.insertId, ...newVoter });
  });
};

Voter.checkCredentials = (id,password, result) => {
  //console.log(id+" "+ password)
  sql.query("SELECT * FROM VOTERS WHERE VoterID = ? AND Password = ?",
  [id, password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found voter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Voter;