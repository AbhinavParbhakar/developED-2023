

const getUserData = (req, res, next) => {
    res.send('In this request we will retrieve a user info from database. (e.g. when they want to see their profile)');
    next();
}

exports.getUserData = getUserData;