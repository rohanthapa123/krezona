const router = require("express").Router();
const UserController = require("../app/controller/user.controller")
const user_ctrl = new UserController();

const auth = require("../app/middleware/auth.middleware")
const rbac = require("../app/middleware/role.middleware")

router.get("/",auth, rbac.isAdmin, user_ctrl.getAllUsers);
router.patch(":id/verify", auth, rbac.isAdmin, user_ctrl.verifyUser);

module.exports = router;