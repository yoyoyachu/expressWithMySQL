const express = require('express');
const path = require('path');
const methodOverride = require('method-override');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))


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

//edit form
app.get('/edit', async(req, res) =>{
    const getId = req.query.std_id;
    console.log(getId)
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(
            "SELECT * FROM student WHERE std_id = ?",
            [getId], async(er, result, fields)=> {
            if (er) throw er;
            console.log(result);
            res.render('edit',{result})
        });
    });
    
    
});

app.put('/edit',async (req,res)=>{
    const {std_id,name,age} = req.body;
    pool.getConnection(async function(err, connection) {
        if (err) throw err;
        connection.query(
            "UPDATE student SET name = ?, age = ? WHERE std_id = ?", 
            [name, age, std_id], async(er, result, fields)=> {
            if (er) throw er;
            console.log(result);
        });
    });
    res.redirect('/');
});

app.delete('/delete',(req,res)=>{
    const getId = req.body.std_id;
    pool.getConnection(async function(err, connection) {
        if (err) throw err;
        connection.query(
            "DELETE FROM student WHERE std_id = ?", 
            [getId], async(er, result, fields)=> {
            if (er) throw er;
            console.log(result);
        });
    });
    res.redirect('/');
})




app.listen(5000, () => {
    console.log(`Listening on port 5000`)
});


