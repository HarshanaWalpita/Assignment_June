let classModule = require('../data/class.json');
const filename = './data/class.json';
const helper = require('../helpers/helper');

// insert classname, enums, student list to class file
function insertClass(newClassModule) {
    return new Promise((resolve, reject) => {

        const id = helper.getNewId(classModule)
        const date = { 
            createdAt: helper.newDate()
        }

        newClassModule = {...newClassModule,
                    id: id,
                    date: date }

        classModule.push(newClassModule)
        helper.writeJSONFile(filename, classModule) // call file write function in helper file
        resolve(newClassModule).catch(err => reject(err))
    })
}

// check whether class name is duplicated
function findDuplicateClass(className) {
    return new Promise((resolve, reject) =>{
        helper.mustNotBeInClass(classModule, className).then(clsModule => resolve(clsModule)).catch(err => reject(err))
    })
}

// get modules in the class
function getClassModules(){
    return new Promise((resolve, reject) =>{
        helper.hasModules(classModules).then(classModule => resolve(classModule)).catch(err => reject(err))
    })
}

// get modules related to particular class
function executeModule(className){
    return new Promise((resolve, reject) =>{
        helper.getExecuteModule(classModules, className).then(classModule => resolve(classModule)).catch(err => reject(err))
    })
}

// export functions
module.exports = {
    insertClass,
    findDuplicateClass,
    getClassModules,
    executeModule
}