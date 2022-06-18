let users = require('../data/users.json');
const filename = './data/users.json';
const helper = require('../helpers/helper');

// insert users to user file
function insertUser(newUser) {
    return new Promise((resolve, reject) => {

        const id = helper.getNewId(users)
        const date = { 
            createdAt: helper.newDate()
        } 

        newUser = {...newUser,
                    id: id,
                    date: date }

        users.push(newUser)
        helper.writeJSONFile(filename, users)
        resolve(newUser).catch(err => reject(err))
    })
}

// find a user by id
function findByID(id) {
    return new Promise((resolve, reject) =>{
        helper.mustBeInArray(users, id).then(user => resolve(user)).catch(err => reject(err))
    })
}

// find duplicate usernames
function findDuplicateUser(name) {
    return new Promise((resolve, reject) =>{
        helper.mustNotBeInUsers(users, name).then(user => resolve(user)).catch(err => reject(err))
    })
}

// find duplicate users by passing array
function findDuplicateUserFromArray(userArray) {
    const promises = userArray.map(async (obj) =>{
        return await helper.mustNotBeInUsers(users, obj.name);
    })
    return Promise.all(promises);
}

// find one user from user file
function findOne(name, password) {
    return new Promise((resolve, reject) =>{
        helper.mustBeInUsers(users, name, password).then(user => resolve(user)).catch(err => reject(err))
    })
}

// generate token
function genarateToken(id) {
    return new Promise((resolve,reject)=>{
        const token = helper.getToken(id);
        resolve(token).catch(err => reject(err));
    })
}

// export functions
module.exports = {
    insertUser,
    findByID,
    findOne,
    genarateToken,
    findDuplicateUserFromArray,
    findDuplicateUser
}