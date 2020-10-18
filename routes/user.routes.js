const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");

const jwtHelper = require("../config/jwtHelper");

//user routes
router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post("/sign", ctrlUser.userProfileByEmail);
router.get("/users", ctrlUser.getAllUsers);
router.delete("/users/:id", ctrlUser.deleteUserById);
router.get("/sitemanagers", ctrlUser.getSiteManagers);

module.exports = router;
