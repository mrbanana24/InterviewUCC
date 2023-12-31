const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

// enpoint para crear un usuario
router.post("/register", userController.register);

// enpoint para loguear un usuario
router.post("/login", userController.login);

// verificar token
router.post("/verify", userController.verifyToken);

// agregar profesion al usuario
router.post("/addjob", userController.addJob);

// obtener profesiones del usuario
router.get("/getjobs/:nombre", userController.getJobs);

// eliminar profesion del usuario
router.delete("/deletejob/:nombre/:id", userController.deleteJob);

// editar profesion del usuario
router.put("/updatejob/:id", userController.editJob);

module.exports = router;
