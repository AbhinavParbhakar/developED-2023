

const getUserData = (req, res, next) => {
    res.send('In this request we will retrieve a user info from database. (e.g. when they want to see their profile)');
    next();
}

const createUser = (req, res, next) => {
    res.send('In this request we will send the registered user data to the database')
}

const validateUser = (req, res, next) => {
    // check if user matches witt db
    const {email, password} = req.body
    


}

const modifyUser = (req, res, next) => {
//update the user information in the database
}





exports.getUserData = getUserData;
exports.createUser = createUser;
exports.validateUser = validateUser;
exports.modifyUser = modifyUser;

