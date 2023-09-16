
const sql = require('./db');

const User = function () {};

User.getById = (id, handler) => {
    sql.query(
        'SELECT CONCAT(f_name, " ", l_name) AS full_name FROM users WHERE id = ?',
        id,
        (error, results) => {
            if (error) {
                handler(error, null);
            }
            else {
                handler(null, results[0]);
            }
        });    
}

module.exports = User;