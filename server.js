var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

// mongoose.connect('mongodb://localhost/matlabMeanDemo');

var io = require('socket.io')(app.listen(3000));


/*==========  Receive the request and send response  ==========*/
app.use(express.static(__dirname + '/app'));

io.on('connection', function(socket) {
    fs.watch('data', function(event, filename) {
        fs.readFile('data/' + filename, function(err, data) {
            if (!err) {
                try {
                    var x = JSON.parse(data);
                    socket.emit('updated', x);
                } catch (e) {
                    console.log('malformed data');
                }
                    
            
        }
    })
});
});

app.get("/", function(req, res) {
    res.sendfile("/index.html");
});
