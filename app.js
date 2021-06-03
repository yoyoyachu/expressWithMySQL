
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "example",
//   database: "class"
// });


// con.connect(function(err) {
//     if (err) throw err;
//   con.query("SELECT * FROM students WHERE name='ruchi'", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "example",
    database: "class"
    });


    con.connect(function(err) {
        if (err) throw err;
    con.query("SELECT * FROM students ", function (err, result, fields) {
        if (err) throw err;
        const resu = result;
        console.log(res);
        for(let student in resu){
            console.log(student);
            res.send(student)
        }
    });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});


