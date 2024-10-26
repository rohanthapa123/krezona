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
});

const taskModel = mongoose.model("Task", taskDataSchema);

module.exports = taskModel;
