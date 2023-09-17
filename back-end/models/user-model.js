
const sql = require('./db');

const User = function () {};

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

module.exports = User;