const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser")
dotenv.config();

require("./config/dbconfig")

const app = express();

const router = require("./routes")

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true 
    })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieparser())

app.use(router);



app.use((error, req, res, next) =>{
    let status = error.status ?? 500;
    let message = error.message ?? error;
    res.status(status).json({result : null, status: false, message: message})
})

app.listen(8085, () => {
    console.log("Server running on port 8085");
});
