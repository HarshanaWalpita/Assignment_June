const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ErrorResponse = require("../utils/errorResponse");

// validate admin when login
exports.protect = async (req, res, next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse("Not authorized to access this route for Admin", 401));
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByID(decode.id);

        if (!user) {
            return next(new ErrorResponse("No Admin was found with this id", 404));
        }

        req.user = user;
        if (user.type === 1) {
            next();
        }else{
            next(new ErrorResponse("Invalid token for the Admin", 401));
        }
            

    } catch (error) {
        next(new ErrorResponse("Not authorized to access this routes for Admin", 401));
    }

}