const Instructor = require("../../models/users");
const ErrorResponse = require("../../utils/errorResponse");

// login for instructor
exports.login = async(req, res, next) => {
    const {name, password} = req.body;

    if(!name || !password){
        return next(new ErrorResponse("Please provide valid email and password", 400));
    }

    try {
        const instructor = await Instructor.findOne(name, password);
        if (!instructor) {
            return next(new ErrorResponse("Invalid credintials", 401)); 
        }
        const token = await Instructor.genarateToken(instructor.id);
        return res.status(200).json({
            success: true,
            instructor,
            jwtToken: token
        })
    } catch (error) {
        next(error);
    }
}