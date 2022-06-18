let users = require('../data/users.json');
let classModules = require('../data/class.json');
const filename = './data/users.json';
const helper = require('../helpers/helper');

// insert students to user file
function insertStudent(newUser) {
    return new Promise((resolve, reject) => {

        const id = helper.getNewId(users)
        const date = { 
            createdAt: helper.newDate()
        } 

        newUser = {...newUser,
                    id: id,
                    type: 3,
                    date: date }

        users.push(newUser)
        helper.writeJSONFile(filename, users)
        resolve(newUser).catch(err => reject(err))
    })
}

// get students array and insert students one by one to user file
function insertBulkStudents(userArray) {
    const promises = userArray.map(async (obj) => {
        return await insertStudent(obj);
    });
    return Promise.all(promises);
}

// get class module related to a student
function getStudentClassModules(stuName){
    return new Promise((resolve, reject) =>{
        helper.getStudentModules(classModules, stuName).then(classModule => resolve(classModule)).catch(err => reject(err))
    })
}

// get enum modules related to a class and student
function executeModuleForStudents(className, stuName){
    return new Promise((resolve, reject) =>{
        helper.getExecuteModuleForStudents(classModules, className, stuName).then(classModule => resolve(classModule)).catch(err => reject(err))
    })
}

// export functions
module.exports = {
    insertBulkStudents,
    getStudentClassModules,
    executeModuleForStudents
}