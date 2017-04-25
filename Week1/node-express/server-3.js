var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', function(req,res,next){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
});

app.get('/dishes', function(req,res,next){
	res.end('Will send all the dishes to you !');
	next();
});

app.post('/dishes', function(req,res,next){
	res.end('Will add the dish: ' + req.body.name + 'with details: ' + req.body.description);
});

app.delete('/dishes', function(req,res,next){
	res.end('Deleting all dishes');
});

app.get('/dishes/:dishID', function(req,res,next){
	res.end('Will send details of the dish: ' + req.params.dishID + ' to you! ');
});

app.put('/dishes/:dishID', function(req,res,next){
	res.write('Updating the dish: ' + req.params.dishID + '\n');
	res.end('Will update the dish: ' + req.body.name + 'with details: ' + req.body.description);
});

app.delete('/dishes/:dishID', function(req,res,next){
	res.end('Deleting dish: ' + req.params.dishID);
});

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
 console.log(`Server running at http://${hostname}:${port}/`);
});
