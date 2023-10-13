
const sql = require('./db');

const User = function (user) {
    this.f_name = user.f_name;
    this.l_name = user.l_name;
    this.email = user.email;
    this.passwd = user.passwd;
    this.b_day = user.b_day;
};

//Check scope of this function (can be for user login)
User.getById = (id, handler) => {

    sql.query(
        'SELECT * FROM users WHERE id = ?',
        id,
        (error, results) => {
            if (error) {
                handler(error, null);
            }
            else {
                console.log(results);
                handler(null, results[0]);
            }
        });    
};

User.getByCredentials = (email,password,handler) => {

    sql.query('SELECT f_name,l_name,email, passwd,b_day, bin_to_uuid(id) as id FROM users WHERE email = ? AND passwd = ?',
    [email,password],
    (error,results) => {
        if (error){
            handler(error,null)
        }
        else if (!results.length) {
            handler({ kind: 'not_found' }, null);
        }
        else{
            handler(null,results[0])
        }
    })
}

User.update = (id, updatedUser, handler) => {
    sql.query(
        'UPDATE users SET f_name = ?, l_name = ?, email = ?, passwd = ?, b_day = ? WHERE id = UUID_TO_BIN(?)',
        [...Object.values(updatedUser), id],
        (error, results) => {
            if (error) {
                handler(error, null);
            }
            else {
                handler(null, null);
            }
        }
    );
};

// creates a new user in the table users
User.create = (id, newUser, handler) => {
    sql.query(
        'INSERT INTO users (id, f_name, l_name, email, passwd, b_day) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?)',
        [id, ...Object.values(newUser)],
        (error, results)=> {
            if(error) {
                console.log(error);
                handler(error, null);
            }
            else {
                handler(null, results);
            }
        }
    )
}

module.exports = User;