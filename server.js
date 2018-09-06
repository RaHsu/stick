const express = require('express');
const db = require('./data.js');
var bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 对网络请求做处理
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 新增一条记录的接口
app.post('/insert',function(req,res){
	let result = db.insert(req.body.data);
	if(result){
		res.send(db.get());
	}else{
		res.send(false);
	}
})

// 删除一条记录的接口
app.post('/delete',function(req,res){
	let result = db.delete(parseInt(req.body.data));
	if(result){
		res.send(db.get());
	}else{
		res.send(false);
	}
})

// 获取记录
app.get('/get',function(req,res){
	res.send(db.get());
})

// 启动服务端
const server = app.listen(8000,function(){
	var host = server.address().address;
  	var port = server.address().port;
  	console.log('Example app listening at http://%s:%s', host, port);
})

// 启动客户端
app.use(express.static('./'));
