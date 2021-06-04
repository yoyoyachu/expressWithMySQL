const express = require('express');
const path = require('path');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "example",
//     database: "class"
// });


var pool = mysql.createPool({
    connectionLimit: 5000,
    host: 'localhost',
    user: 'root',
    password: 'example', 
    database: 'class'
});


//home page
app.get('/home',(req,res)=>{
    res.send('data inserted')
})


//new form
app.get('/new',  (req, res)=> {
    res.render('new')
});


// add data
app.post('/',async (req,res)=>{
    const {name,age} = req.body;
    const sql = "INSERT INTO `student` (`name`,`age`) VALUES ('"+name+"','"+age+"')";
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, async(er, result, fields)=> {
            if (er) throw er;
            console.log(result);
        });
    });
    res.redirect('/');
});

//read
app.get('/', async(req, res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM student ", async(er, result, fields)=> {
            if (er) throw er;
            console.log(result);
            res.render('view',{result})
        });
    });
    // con.connect(async(err) =>{
    //     if (err) throw err;
    //     con.query("SELECT * FROM students ", async(er, result, fields)=> {
    //         if (er) throw er;
    //         console.log(result);
    //         res.render('view',{result})
    //     });
    // });
    
});



app.listen(5000, () => {
    console.log(`Listening on port 5000`)
});


