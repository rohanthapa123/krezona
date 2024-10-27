const router = require("express").Router();

const AuthController = require("../app/controller/auth.controller");
const auth_ctrl = new AuthController();

router.post("/register" , auth_ctrl.createUser);
router.post("/login", auth_ctrl.login);
router.post("/logout", auth_ctrl.logout)

module.exports = router;
