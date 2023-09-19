const mysql = require('mysql2');

const { host, user, port, password, database } = require('../db.config');

const connection = mysql.createConnection({
    host,
    user,
    port,
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