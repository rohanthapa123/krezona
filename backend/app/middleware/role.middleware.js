const isAdmin = (req, res, next) => {
  
    if (req.user.role === "admin") {
      next();
    } else {
        next({status: 403 , message: "Access Denied"})
    }
};

const isUser = (req, res, next) =>{
    if(req.user.role === "user"){
        next();
    }else{
        next({status: 403, message: "Access Denied"})
    }
}


module.exports = {isAdmin , isUser};