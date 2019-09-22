// get the client
const mysql = require('mysql');

// create the connection to database
const connection = mysql.createConnection({
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'dkflbckfd99V',
    // database: 'mamashop'
    host: 'sql7.freemysqlhosting.net',
    port: 3306,
    user: 'sql7305948',
    password: '1lzWYhjRNn',
    database: 'sql7305948'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;