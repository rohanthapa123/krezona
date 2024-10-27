const TaskService = require("../services/task.service")
const Task = require("../model/task.model")


class TaskController{
    constructor() {
        this.task_service = new TaskService();
      }

    addTask = async (req, res) =>{
        const data = req.body;
    
        console.log(data);
        console.log(req.user);
        try {
            const mytask = new Task({
                title : data?.title,
                description : data?.description,
                status : data?.status,
                user: data?.user,
                assignedBy: req.user.user_id
            });
            console.log(mytask);
            await this.task_service.addTask(mytask);
            res.status(200).json({message : "Data saved"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message : "Failed to save task"});
        }
    }

    updateTask = async(req, res) => {
        const data = req.body;
        const id = req.params.id;
        
        console.log(data);
        try {
            await this.task_service.updateTask(id,data);
            res.status(200).json({message : "Data saved"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message : "Failed to save task"});
        }
    }

    getTask = async (req, res) => {
        try {
            console.log("Request Received")
            const tasks = await this.task_service.getTask();
            console.log(tasks)
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error retrieving tasks", error });
        }
    }

    getTaskById = async (req, res) => {
        try {
            const id = req.params.id;
            const tasks = await this.task_service.getTaskById(id);
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error retrieving tasks", error });
        }
    }

    changeTaskStatus = async(req, res) => {
        try {
            const id = req.params.id;
            console.log(req.body)
            const newStatus = req.body.status;
            console.log(id, newStatus);
            const changedTask = await this.task_service.changeTaskStatus(id, newStatus);
            res.status(200).json({ message : "Status changed"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error deleting tasks", error });
        }
    }

    deleteTask = async (req, res) =>{
        try {
            const id = req.params.id;
            console.log(id);
            const deletedUser = await this.task_service.deleteTask(id);
            if(deletedUser){
                res.status(200).json({message : "Deleted Success"});
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error deleting tasks", error });
        }
    }

    acceptTask = async (req, res) => {
        try {
            const id = req.params.id;
            const changedTask = await this.task_service.acceptTask(id);
            res.status(200).json({message : "Task Accepted"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error Accepting tasks", error });
        }
    }

    getMyTask = async (req, res) =>{
        try {
            const id = req.user.user_id;
            const tasks = await this.task_service.getMyTask(id);
            res.status(200).json({result : tasks, message : "Task Fetched Successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error Fetching tasks", error });
        }
    }

    getAssignedTask = async (req, res) =>{
        try {
            const id = req.user.user_id;
            const tasks = await this.task_service.getAssignedTask(id);
            res.status(200).json({result : tasks, message : "Task Fetched Successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error Fetching tasks", error });
        }
    }
}


module.exports = TaskController;