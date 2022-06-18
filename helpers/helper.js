const fs = require('fs');
const jwt = require("jsonwebtoken");

// get next id from array
const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

// get date
const newDate = () => new Date().toString()

// check whether id exixts in the array 
function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID is not found',
                statusCode: 404
            })
        }
        resolve(row)
    })
}

// check whether name exists in the array
function mustNotBeInUsers(array, name) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => (r.name === name))
        if (!row) {
            resolve('resolved');
        }
        else{
            reject({
                statusCode: 404,
                message: 'Duplicate User is found'
            })
        }
    })
}

// check whether username and password are exists
function mustBeInUsers(array, name, password) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => (r.name === name && r.password === password))
        if (!row) {
            reject({
                message: 'ID is not found',
                statusCode: 404
            })
        }
        resolve(row)
    })
}

// get module enums
function hasModules(array) {
    return new Promise((resolve, reject) =>{
        const row = array.map(r => r.moduleEnum)
        if (row.length == 0) {
            reject({
                message: 'Modules not found',
                status: 404
            })
        }
        resolve(row)
    })
}

// get module enums related to student name from class file
function getStudentModules(array, stuName) {
    return new Promise((resolve, reject) =>{
        const row = array.filter((item) => {
            return (item.students.some(stu=>stu.name == stuName))
        }).map(r => r.moduleEnum);
        if (row.length == 0) {
            reject({
                message: 'Modules not found',
                status: 404
            })
        }
        resolve(row)
    })
}

// get module enums in the class
function getExecuteModule(array, className) {
    return new Promise((resolve, reject) =>{
        const row = array.filter(r => r.className == className)
        if (row.length == 0) {
            reject({
                message: 'Modules not found',
                status: 404
            })
        }
        resolve(row)
    })
}

// get module enums in the class related to student username
function getExecuteModuleForStudents(array, className, stuName) {
    return new Promise((resolve, reject) =>{
        const classRow = array.filter(r => r.className == className)
        const row = classRow.filter((item) => {
            return (item.students.some(stu=>stu.name == stuName))
        }).map(r => r.moduleEnum)
        if (row.length == 0) {
            reject({
                message: 'You are not authorized to access this module',
                status: 401
            })
        }
        resolve(row)
    })
}

// check whether class name is duplicated
function mustNotBeInClass(array, className) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => (r.className === className))
        if (!row) {
            resolve('resolved');
        }
        else{
            reject({
                statusCode: 404,
                message: 'Duplicate Class is found'
            })
        }
    })
}

// get token using secret key
function getToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

// write data to relevant class and user files
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

// export functions
module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    getToken,
    mustBeInUsers,
    mustNotBeInUsers,
    hasModules,
    getStudentModules,
    getExecuteModule,
    getExecuteModuleForStudents,
    mustNotBeInClass
}