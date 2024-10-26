const { default: mongoose } = require("mongoose");


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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

const taskModel = mongoose.model("Task", taskDataSchema);

module.exports = taskModel;
