var express=require('express');
var mongoose=require('mongoose');
var fs=require('fs');
var app=express();

// mongoose.connect('mongodb://localhost/matlabMeanDemo');

var io = require('socket.io')(app.listen(3000));


/*==========  Receive the request and send response  ==========*/
app.use(express.static(__dirname + '/app'));

fs.watch('data',function(event,filename){
	fs.readFile('data/'+filename,function(err,data){
		console.log(JSON.parse(data));
	})
})

app.get("/", function(req, res) {
    res.sendfile("/index.html");
});