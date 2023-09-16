const mysql = require('mysql');

const { host, user, password, database } = require('../db.config');

const connection = mysql.createConnection({
    host,
    user,
    password,
    database
});

connection.connect(error => {
    if (error) {
        // Should this stay like this?
        throw error;
    }
    console.log('Connected succesfully to database.');
});

module.exports = connection;