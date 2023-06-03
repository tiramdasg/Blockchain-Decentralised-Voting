const sql = require("./db.js");

// constructor
const Voter = function (voter) {
  this.VoterName = voter.VoterName;
  this.VoterID = voter.VoterID;
  this.Email = voter.Email;
  this.Password = voter.Password;
  this.isAdmin = voter.isAdmin;
  this.public_key = voter.public_key;
  this.hasVoted = voter.hasVoted;
  this.isApproved = voter.isApproved;
};

Voter.add = async (newVoter) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO VOTERS SET ?", [newVoter], (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }

      console.log("Added Voter: ", { id: res.insertId, ...newVoter });
      resolve({ id: res.insertId, ...newVoter });
    });
  });
};

/*Voter.add = (newVoter, result) => {
  sql.query("INSERT INTO VOTERS SET ?", [newVoter], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Added Voter: ", { id: res.insertId, ...newVoter });
    result(null, { id: res.insertId, ...newVoter });
  });
}; */

Voter.checkKey = async (key) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT public_key FROM VOTERS WHERE public_key = ?", [key], (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log("found key: ", res[0]);
        resolve(res[0]);
      } else {
        reject({ kind: "not_found" });
      }
    });
  });
};

/*
Voter.checkKey = (key, result) => {
  sql.query("SELECT public_key FROM VOTERS WHERE public_key = ?",
    [key], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found key: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
}; */

Voter.checkCredentials = (id, password, result) => {
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

      result({ kind: "not_found" }, null);
    });
};

Voter.getKey = (VoterID, result) => {
  sql.query(
    "SELECT PUBLIC_KEY FROM VOTERS WHERE VoterID = ?",
    [VoterID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found key: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

// send to be approved list
Voter.checkApproved = (result) => {
  sql.query(
    "SELECT VoterID, VoterName, Email, isAdmin, isApproved FROM voters WHERE isAdmin = 0 AND (NOT isApproved = 1 OR isApproved IS NULL)",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("voters to be approved: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

// send to be approved list
Voter.approveVoter = (id, result) => {
  sql.query("UPDATE voters SET isApproved = 1 WHERE VoterID = ?",
    [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("voter to be approved: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Voter;