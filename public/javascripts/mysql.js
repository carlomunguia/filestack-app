var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    database: 'filestack_db',
    user: 'root'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});