const router = require("express").Router();
const requsitionController = require("../controllers/requsitions.controllers");

//Routes
router.get("/requsitions", requsitionController.viewRequsitions);
router.put("/requsitions/:id", requsitionController.updateRequsition);

module.exports = routes;
