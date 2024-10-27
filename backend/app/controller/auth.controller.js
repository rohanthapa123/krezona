const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class AuthController {
  constructor() {
    this.auth_service = new UserService();
  }

  createUser = async (req, res, next) => {
    try {
      let data = req.body;
      console.log(data);
      this.auth_service.validateUser(data);
      data.password = bcrypt.hashSync(data.password, 10);
      let response = await this.auth_service.createUser();
      res
        .status(200)
        .json({ result: response, message: "User Registered Successfully" });
    } catch (error) {
      console.log(error);
      next({ status: 400, message: error });
    }
  };

  login = async (req, res, next) => {
    try {
        console.log("hello")
      let data = req.body;
      console.log(data)
      let loggedInUser = await this.auth_service.getUserByUsername(
        data.username
      );
      if (loggedInUser) {
        let isPasswordCorrect = bcrypt.compareSync(
          data.password,
          loggedInUser.password
        );
        if (isPasswordCorrect) {
        //   console.log(loggedInUser);
          if (loggedInUser.role === "user" && loggedInUser.verified === false) {
            next({ status: 403, message: "Not verified by Admin" });
          } else {
            const token = jwt.sign(
              {
                user_id: loggedInUser._id,
                username: loggedInUser.username,
                role : loggedInUser.role
              },
              process.env.JWT_SECRET
            );

            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              maxAge: 3600000,
            });

            res.status(200).json({
              result: loggedInUser,
              token: token,
              status: true,
              message: "Logged in successfully",
            });
          }
        } else {
          next({ status: 403, message: "Incorrect Password" });
        }
      } else {
        next({ status: 403, message: "Invalid username" });
      }
    } catch (error) {
      console.log(error);
      next({ status: 400, message: error });
    }
  };

  logout = (req, res, next) =>{
    try {
        res.clearCookie("token");
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        next({ status: 400, message: error });
    }
  }
}

module.exports = AuthController;
