const sql = require("./db.js");

// constructor
const Voter = function (voter) {
  this.VoterName = voter.VoterName;
  this.VoterID = voter.VoterID;
  this.Email = voter.Email;
  this.Password = voter.Password;
  this.isAdmin = voter.isAdmin;
  this.public_key = voter.public_key;
  this.isAprroved = voter.isAprroved;
};

Voter.add = async (newVoter) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO voters SET ?", [newVoter], (err, res) => {
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
  sql.query("INSERT INTO voters SET ?", [newVoter], (err, res) => {
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
    sql.query("SELECT public_key FROM voters WHERE public_key = ?", [key], (err, res) => {
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

Voter.checkUser = async (userId) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM voters WHERE VoterID = ?", [userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log("Output in checkUser: "+res[0])
        resolve(res[0]);
      } else {
        reject({ kind: "not_found" });
      }
    });
  });
};


Voter.getKeys = async () => {
  return new Promise((resolve, reject) => {
  sql.query("SELECT public_key FROM voters WHERE public_key IS NOT NULL AND VoterID NOT IN ('12345')", (err, res) => {
    if (err) {
      console.log("error: ", err);
      reject(err);
      return;
    }

    if (res.length) {
      console.log("Output in getKeys: "+res)
      resolve(res);
    } else {
      reject({ kind: "not_found" });
    }
  });
});
};

Voter.checkCredentials = (id, password, result) => {
  //console.log(id+" "+ password)
  sql.query("SELECT * FROM voters WHERE VoterID = ? AND Password = ?",
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
    "SELECT PUBLIC_KEY FROM voters WHERE VoterID = ?",
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
Voter.checkApproved = async () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT VoterID, VoterName, Email, isAdmin, isAprroved FROM voters WHERE isAdmin = 0 AND (NOT isAprroved = 1 OR isAprroved IS NULL)", (err, res) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log("Output in checkUser: "+res)
        resolve(res);
      } else {
        reject({ kind: "not_found" });
      }
    });
  });
};

// send to be approved list
Voter.approveVoter = async (id, result) => {
  sql.query("UPDATE voters SET isAprroved = 1 WHERE VoterID = ?",
    [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { "message": "User Approved" });
    }
  );
};


module.exports = Voter;