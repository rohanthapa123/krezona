const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");
let user_service = new UserService();

const auth = async (req, res, next) => {
    try {
        // console.log(req.cookies)
        const token = req.cookies.token;
        // console.log(req);
        if(!token){
            next({status: 403, message: "No token provided"})
        }
        
        jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
            if(err){
                next({status: 403, message: "Invalid token"})
            }else{
                req.user=decoded;
            next();
            }
        })
    } catch (error) {
        console.log(error);
        next({status: 403, message: "Unauthorized"})
    }
}

module.exports = auth;