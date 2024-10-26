
const app_router = require("express").Router();

const taskRouter = require("./task.route")
const authRouter = require("./auth.route")
const userRouter = require("./user.route")

app_router.use("/tasks",taskRouter);
app_router.use("/auth", authRouter );
app_router.use("/user",userRouter);

module.exports = app_router;