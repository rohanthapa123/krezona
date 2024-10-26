const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.error("Failed to connect to db", err);
    });

    