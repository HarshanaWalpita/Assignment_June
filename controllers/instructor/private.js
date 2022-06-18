const ClassModule = require("../../models/class");
const ModuleEnums = require("../../utils/enums");
const Student = require("../../models/students");
const Instructor = require("../../models/users");

// insert class and students by instructor
exports.insertClassModule = async (req, res, next) => {

    try {
        const { className, studentArray } = req.body;
        const moduleEnum = ModuleEnums[req.body.enum];

        _ = await Instructor.findDuplicateUserFromArray(studentArray); // check whether entered student usernames are already exixts

        _ = await Student.insertBulkUsers(studentArray); // add students to users file with username, password

        _ = await ClassModule.findDuplicateClass(className); // check whether entered class name is already exixts

        const students = studentArray.map(function (stu) {
            delete stu.password;
            return stu;
        });

        // add class name, enum, students list to class file
        const classModule = await ClassModule.insertClass({ className, moduleEnum, students });

        return res.status(200).json({
            success: true,
            classModule
        })

    } catch (error) {
        next(error);
    }
}

// instructor view modules
exports.getModules= async(req,res, next) =>{
    try {

        const modules = await ClassModule.getClassModules();

        return res.status(200).json({
            success: true,
            modules
        })
        
    } catch (error) {
        next(error);
    }
}

// instructor execute modules
exports.getExecuteModules = async(req,res, next) =>{
    try {

        let className = req.params.className;

        const modules = await Instructor.executeModule(className);

        return res.status(200).json({
            success: true,
            message : 'Hello Module' + ' ' + modules[0].moduleEnum
        })
        
    } catch (error) {
        next(error);
    }
}