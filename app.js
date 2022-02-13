const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const port = 3000



const mysql = require('mysql2');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Merutomo1',
  database: 'express_db'
});


con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});

app.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
  res.sendFile(path.join(__dirname, 'html/form.html'))
	});
});

app.get('/list', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
});

app.get('/edit/:id',(req,res)=>{
	const sql = "SELECT * FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function (err, result, fields) {  
		if (err) throw err;
		res.render('edit',{user : result});
		});
});
app.get('/delete/:id',(req,res)=>{
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});

app.post('/update/:id',(req,res)=>{
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql,req.body,function (err, result, fields) {  
		if (err) throw err;
		console.log(result);
		res.redirect('/');
		});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))