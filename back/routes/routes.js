const express = require("express");
const router = express.Router();

const User = require("../models/user");

const userController = require("../controllers/userControllers");

// enpoint para crear un usuario
router.post("/register", userController.register);

module.exports = router;
