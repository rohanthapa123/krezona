const UserService = require("../services/user.service")

class UserController{
    constructor(){
        this.user_service = new UserService();
    }

    getAllUsers = async (req, res, next) => {
        try {
            const result = await this.user_service.getUser();
            res.status(200).json({result: result})
        } catch (error) {
            console.log(error);
            next({status: 500, message: "Failed to fetch user"})
        }
        
    }

    verifyUser = async (req, res, next) =>{
        try {
            const id = req.params.id;
            console.log(id)
            const result = await this.user_service.verifyUser(id);
            res.status(200).json({result: result})
        } catch (error) {
            console.log(error);
            next({status: 500, message: "Failed to verify user"})
        }
    }


}

module.exports = UserController;