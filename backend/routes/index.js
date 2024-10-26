
const app_router = require("express").Router();

const taskRouter = require("./task.route")

app_router.use("/tasks",taskRouter);


module.exports = app_router;