const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const port = 3000
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// mysqlログイン情報
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'test',
	database: 'express_db'
  });


// 現在テーブルに格納されているユーザー一覧
app.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
});

app.post('/', (req, res) => {
	const sql = "INSERT INTO users SET ?"
	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});
// 追加用のフォーム
app.get('/create', (req, res) => 
	res.sendFile(path.join(__dirname, 'html/form.html')))

// すでに格納されているデータ編集用
app.get('/edit/:id',(req,res)=>{
	const sql = "SELECT * FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function (err, result, fields) {  
		if (err) throw err;
		res.render('edit',{user : result});
		});
});
//すでに格納されてるデータ更新用
app.post('/update/:id',(req,res)=>{
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql,req.body,function (err, result, fields) {  
		if (err) throw err;
		console.log(result);
		res.redirect('/');
		});
});
//すでに格納されてるデータ削除用
app.get('/delete/:id',(req,res)=>{
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));