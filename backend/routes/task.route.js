const router = require("express").Router();

const auth = require("../app/middleware/auth.middleware")
const rbac = require("../app/middleware/role.middleware")
const TaskController = require("../app/controller/task.controller")
const task_ctrl = new TaskController();

router.route("/").post(auth,task_ctrl.addTask)

router.route("/:id").put(auth,rbac.isAdmin, task_ctrl.updateTask)

router.route("/").get(auth, task_ctrl.getTask);

router.route("/:id").get(auth,task_ctrl.getTaskById);

router.route("/:id/status").patch(auth,rbac.isUser, task_ctrl.changeTaskStatus)

router.route("/:id").delete(auth, rbac.isAdmin, task_ctrl.deleteTask)

router.route("/:id/accept").patch(auth, rbac.isUser , task_ctrl.acceptTask)


module.exports = router;