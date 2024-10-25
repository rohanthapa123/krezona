
const Task = require("../model/task.model")

class TaskService{
    addTask = async (data) =>{
        
        try {
            
            await data.save().then(() => console.log("Saved to db"))
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    updateTask = async(id, data) => {
        
        try {
            await Task.findByIdAndUpdate(id, data).then(() => console.log("Saved to db"))
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getTask = async () => {
        try {
            const tasks = await Task.find();
            // console.log(tasks)
            return tasks;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getTaskById = async (id) => {
        try {
            const tasks = await Task.findById(id);
            return tasks;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    changeTaskStatus = async(id, newStatus) => {
        try {
            return await Task.findByIdAndUpdate(id, { status : newStatus})   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteTask = async (id) =>{
        try {
            
            const deletedUser = await Task.findByIdAndDelete(id);
            if(deletedUser){
                return deletedUser;
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    acceptTask = async (id) =>{
        try {
            
            const acceptedTask = await Task.findByIdAndUpdate(id, {
                accepted: true
            });
            return acceptedTask;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getMyTask = async (id) =>{
        try {
            
            const acceptedTask = await Task.find({user: id});
            return acceptedTask;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = TaskService