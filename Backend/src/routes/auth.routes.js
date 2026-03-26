const express = require("express");
const AuthRouter = express.Router();
const Authcontroller = require("../controller/auth.controller");
const { identifyUser } = require("../middleware/auth.middleware");
const { registerValidation, loginValidation } = require("../validator/auth.validator");

AuthRouter.post("/register", registerValidation, Authcontroller.Register);
AuthRouter.post("/login", loginValidation, Authcontroller.Login);
AuthRouter.get("/logout", Authcontroller.Logout);
AuthRouter.get("/getme", identifyUser, Authcontroller.getme);
module.exports = AuthRouter;
