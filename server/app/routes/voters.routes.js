module.exports = app => {
    const voters = require("../controllers/voters.controller.js");

    var router = require("express").Router();

    // Add new Voter
    router.post("/", voters.add);

    // Retrieve a single voter with id
    router.post("/:id", voters.checkCredentials);

    // Retrieve all voters
    router.get("/", voters.findAll);

    // Retrieve all published voters
    router.get("/published", voters.findAllPublished);

    // Update a voter with id
    router.put("/:id", voters.update);

    // Delete a voter with id
    router.delete("/:id", voters.delete);

    // Delete all voters
    router.delete("/", voters.deleteAll);

    app.use('/api/voters', router);
};