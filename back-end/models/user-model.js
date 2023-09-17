
const sql = require('./db');

const User = function () {};

//Check scope of this function (can be for user login)
User.getById = (id, handler) => {
    sql.query(
        'SELECT full_name FROM users_pretty WHERE id = ?',
        id,
        (error, results) => {
            console.log(results);
            if (error) {
                handler(error, null);
            }
            else {
                handler(null, results);
            }
        });    
}

// creates a new user in the table users
User.create = (id, newUser, handler) => {
    sql.query(
        'INSERT INTO TABLE users (id, f_name, l_name, email, passwd, b_day) VALUES (?, ?, ?, ?, ?)',
        [id, ...newUser],
        (error, results)=> {
            if(error) {
                handler(error, null);
            }
            else {
                handler(null, results);
            }
        }
    )
}

module.exports = User;