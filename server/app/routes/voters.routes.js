module.exports = app => {
    const voters = require("../controllers/voters.controller.js");

    var router = require("express").Router();

    // Add new Voter
    router.post("/", voters.add);

    // Retrieve a single voter with id
    router.post("/:id", voters.checkCredentials);

    // Retrieve all voters
    router.get("/candidates", voters.getCandidates);

    // Update a voter with id
    router.put("/:id", voters.vote);

    app.use('/api/voters', router);
};