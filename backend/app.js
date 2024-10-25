const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const router = express.Router();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());

app.use(router);

const uri = process.env.MONGO_URI || "mongodb+srv://rohan974:rohan974@cluster0.j4rrxbe.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.error("Failed to connect to db", err);
    });

const taskDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskDataSchema);

router.post("/tasks", async(req, res) => {
    const data = req.body;
    
    console.log(data);
    try {
        const mytask = new Task({
            title : data?.title,
            description : data?.description,
            status : data?.status,
        });
        console.log(mytask);
        await mytask.save().then(() => console.log("Saved to db"))
        res.status(200).json({message : "Data saved"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Failed to save task"});
    }
})

router.get("/tasks", async (req, res) => {
    try {
        
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
});

router.patch("/tasks/:id/status" , async(req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body)
        const newStatus = req.body.status;
        console.log(id, newStatus);
        const changedTask = await Task.findByIdAndUpdate(id, { status : newStatus})
        res.status(200).json({ message : "Status changed"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting tasks", error });
    }
})

router.delete("/tasks/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        console.log(id);
        const deletedUser = await Task.findByIdAndDelete(id);
        if(deletedUser){
            res.status(200).json({message : "Deleted Success"});
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting tasks", error });
    }
})


app.listen(8085, () => {
    console.log("Server running on port 8085");
});
