const Voter = require("../models/voters.model.js");
//const voterweb3 = require("../Web3/voteweb3.js");
// Create and Save a new Voter
exports.add = (req, res) => {
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
      Password:req.body.Password,
      isAdmin: false
    });
    console.log(req.body)
    // Add Voter in the database
    Voter.add(voter, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the Voter"
        });
      else res.send(data);
    });
  };

  // check credentials
exports.checkCredentials = (req, res) => {
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
  };

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Voter.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };
  

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Voter.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Voter.updateById(
      req.params.id,
      new Tutorial(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Voter.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Voter.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };