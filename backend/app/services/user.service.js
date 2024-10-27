const UserModel = require("../model/user.model")
const Joi = require("joi")

class UserService{
    validateUser = (data) => {
       try {
        const userSchema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8),
            role: Joi.string().default("user"),
        })
        const response = userSchema.validate(data);
        if(response.error){
            console.log(response.error.details[0].message)
            throw response.error.details[0].message;
        }
        this.data = data;
       } catch (error) {
            console.log(error);
            throw error;
       }

    }
    createUser = async () =>{
        try {
            let user = new UserModel(this.data);
            return await user.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    getUserByUsername = async (username) =>{
        try {
            let result = await UserModel.findOne({
                username: username
            })
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    getUser = async () =>{
        try {
            let result = await UserModel.find({
                role: "user"
            });
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    verifyUser = async (id) =>{
        try {
            let result = await UserModel.findByIdAndUpdate(id, {
                verified: true
            })
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;