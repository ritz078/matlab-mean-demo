var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

mongoose.connect('mongodb://localhost/matlabMeanDemo');

var io = require('socket.io')(app.listen(3000));


app.use(express.static(__dirname + '/app'));

var appData;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {

	/*============================================================
	=            Creating the schema to save the data            =
	============================================================*/
	var dataSchema;

    dataSchema = mongoose.Schema({
        clock: Array,
        hours: Number,
        minutes: Number,
        seconds: Number
    });

    appData = mongoose.model('appData', dataSchema);
	
	
	/*-----  End of Creating the schema to save the data  ------*/



    //Sending and receiving data
    io.on('connection', function(socket) {
        fs.watch('data', function(event, filename) {
            fs.readFile('data/' + filename, function(err, data) {
                if (!err) {
                    try {
                        var x = JSON.parse(data);
                        socket.emit('updated', x);

                        /*==================================================
                        =            Saving the data in MongoDB            =
                        ==================================================*/

                        var savingData = new appData({
                            clock: x.clock,
                            hours: x.hours,
                            minutes: x.minutes,
                            seconds: x.seconds
                        });

                        savingData.save(function(error, savedData) {
                            if (error) {
                                console.log("error in saving");
                            }
                            console.log(savedData);
                        });
                        
                        
                        /*-----  End of Saving the data in MongoDB  ------*/
                        
                    

                    } catch (e) {
                        console.log('malformed data');
                    }


                }
            })
        });
    });


});


app.get("/", function(req, res) {
    res.sendfile("/index.html");
});
