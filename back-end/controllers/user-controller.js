
const User = require('../models/user-model');

const getUserData = (req, res, next) => {
    const { id } = req.params;
 
    User.getById(id, (error, data) => {
        if (error) {
            // Implement later
        }
        else {
            res.json({ full_name: data });
        }
    })
}

const createUser = (req, res, next) => {
    //send the registered user data to the database
    const {f_name, l_name, b_day, email, password} = req.body

    res.send('In this request we will send the registered user data to the database')
}

const validateUser = (req, res, next) => {
    // check if user matches with db
    const {email, password} = req.body



}

const modifyUser = (req, res, next) => {
//update the user information in the database

}





exports.getUserData = getUserData;
exports.createUser = createUser;
exports.validateUser = validateUser;
exports.modifyUser = modifyUser;

