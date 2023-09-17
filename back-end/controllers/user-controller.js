const { v4: uuid } = require('uuid');

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
    const {f_name, l_name, b_day, email, passwd} = req.body
    const newUser = new User({
        f_name,
        l_name,
        b_day,
        email,
        passwd  
    });
    const id = uuid();
    User.create(id, newUser, (error, data) => {
        if(error) {
            console.log(error);
        }
        else {
            res.json("User created: ", {data})
        }
    })

}

const validateUser = (req, res, next) => {
    // check if user matches with db
    const {email, password} = req.body



}

const updateUser = (req, res, next) => {

    const { id } = req.params;
    const { f_name, l_name, email, passwd, b_day } = req.body;

    const updatedUser = new User({
        f_name,
        l_name,
        email,
        passwd,
        b_day
    })

    User.update(id, updatedUser, (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send();
        }
    });

}





exports.getUserData = getUserData;
exports.createUser = createUser;
exports.validateUser = validateUser;
exports.updateUser = updateUser;

