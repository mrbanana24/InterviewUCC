const express = require("express");
const router = express.Router();

const microuserController = require("../controllers/micro-serviceControllers");

// Solamente devuelve los users
router.get("/users", microuserController.getAllUsers);

module.exports = router;
