const Voter = require("../models/voters.model.js");
const web3 = require("../../../web3.js");
//const voterweb3 = require("../Web3/voteweb3.js");
// Create and Save a new Voter
exports.add = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Add a Voter
    const voter = new Voter({
      VoterName: req.body.VoterName,
      VoterID: req.body.VoterID,
      Email: req.body.Email,
      Password: req.body.Password,
      isAdmin: false,
      isAprroved: false,
      public_key: null
    });
    console.log(req.body)
    // Add Voter in the database
    const a = await web3.getAccountList();
    //console.log(a);
    not_found = 0;
    for (i = 1; i < a.length; i++) {
      //console.log("current key: " + a[i])
      await Voter.checkKey(a[i])
        .then(data => {
          // Key found
          console.log("found key: ", data);
        })
        .catch(err => {
          if (err.kind === "not_found") {
            //console.log("Error in not found "+err);
            not_found = 1;
            voter.public_key = a[i];
          } else {
            console.log("Error in else " + err);
            res.status(500).send({
              message: "Error retrieving Voter with id " + req.params.id
            });
          }
        });

      if (not_found === 1) {
        break;
      }
    }
    await Voter.add(voter)
      .then(data => {
        // Voter added successfully
        res.send(data);
      })
      .catch(err => {
        //console.log("Error is as "+err);
        if (err.message.includes("ER_DUP_ENTRY:")) {
          err.message = "Voter ID already exists!"
        }
        res.status(500).send({
          message: err.message || "Some error occurred while adding the Voter"
        });
      });

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding the Voter"
    });
  }
};

// check credentials
exports.checkCredentials = (req, res) => {
  try {
    Voter.checkCredentials(req.body.VoterID, req.body.Password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Invalid Voter ID/Password`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Voter with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message || "Some error occurred while adding the Voter"
    });
  }
};

// Retrieve all candidates from the solidity
exports.getCandidates = async (req, res) => {
  try {
    const a = await web3.getCandidatesDetails();
    console.log("print 2: " + a)
    res.send({ "message": a });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message || "Some error occurred while adding the Voter"
    });
  }
};


// vote for candidate
exports.vote = async (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    console.log("Here with body " + req.body);

    Voter.getKey(req.body.VoterID,
      async (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Voter with id ${req.body.VoterID}.`
            });
          } else {
            res.status(500).send({
              message: "Error in finding Voter with id " + req.body.VoterID
            });
          }
        } else {
          console.log("Print 1: " + data.PUBLIC_KEY)
          try {
            const a = await web3.vote(req.body.candidate_index, data.PUBLIC_KEY);
            console.log("print 2: " + a)
            res.send({ "message": a });
          } catch (err) {
            console.log(err)
            res.status(500).send({
              message: err.message || "Some error occurred while adding the Voter"
            });
          }
        }
      }
    );
  }
  catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message || "Some error occurred while adding the Voter"
    });
  }
};

//Like I said admin rocks
exports.admin = async (req, res) => {
  // Validate request
  console.log("151")
  if (!req.body || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if (req.body.userId) {
    try {
      admin_check = 0;
      console.log("Here at 156: " + req.body)

      await Voter.checkUser(req.body.userId)
        .then(data => {
          // Key found
          console.log("found User/Voter: ", data);
          console.log("Checking if the User is an admin:) " + data.isAdmin)
          if (data.isAdmin == 1) {
            admin_check = 1;
          }
          else
            admin_check = 0;
        })
        .catch(err => {
          if (err.kind === "not_found") {
            //console.log("Error in not found "+err);
            res.status(404).send({
              message: `Not found User with id ${req.body.userId}.`
            });
          } else {
            console.log("Error in else " + err);
            res.status(500).send({
              message: "Error retrieving Voter with id " + req.body.userId
            });
          }
        });


      if (admin_check == 1) {
        if (req.body.handleId == "addcandidate") {
          const response = await web3.addCandidate(req.body.candidateName, req.body.candidateParty, req.body.candidateText);
          console.log("Output is: " + response);
          if (response.includes("0x"))
            res.send({ "message": "Candidate Added Successfully" });
          else
            res.send({ "message": response })
        }
        else if (req.body.handleId == "startCampaign") {
          const response = await web3.startVoting();
          console.log("Output in startCampaign: " + response);
          if (response.includes("0x"))
            res.send({ "message": "Voting has Started" });
          else
            res.send({ "message": response })
        }
        else if (req.body.handleId == "checkcampaignstatus") {
          const response = await web3.hasVotingStarted();
          console.log("Output in checkcampaignstatus: " + response);
          res.send({ "message": response })
        }
        else if (req.body.handleId == "stopCampaign") {
          const response = await web3.endVoting();
          console.log("Output in stopCampaign: " + response);
          if (response.includes("0x"))
            res.send({ "message": "Voting has been Stopped" });
          else
            res.send({ "message": response })
        }
        else if (req.body.handleId == "checkresult") {
          const votingstatus = await web3.hasVotingStarted();
          if (votingstatus == true) {
            res.status(500).send({ "message": "There's an ongoing Voting Campaign" })
          }
          else {
            const response = await web3.VoteCounts();
            console.log("Output in checkresult: " + response);
            res.send({ "message": response })
          }
        }
      }
      else {
        res.status(500).send({
          message: "Something went Wrong!"
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the Voter"
      });
    }
  }
};