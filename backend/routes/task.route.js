const router = require("express").Router();
const Task = require("../app/model/task.model")

router.route("/").post(async(req, res) => {
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

router.route("/:id").put( async(req, res) => {
    const data = req.body;
    const id = req.params.id;
    
    console.log(data);
    try {
        await Task.findByIdAndUpdate(id, data).then(() => console.log("Saved to db"))
        res.status(200).json({message : "Data saved"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Failed to save task"});
    }
})

router.route("/").get( async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.findById(id);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
});

router.route("/:id/status").patch( async(req, res) => {
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

router.route("/:id").delete( async (req, res) =>{
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


module.exports = router;