var http = require('http');
var fs = require('fs');
var path = require('path');

const FileDirectory = "./";

var sum = 0;
var count = 0;


http.createServer(function(req, res) {
	console.log('request starting:'+req.method+" "+req.url);
	var dirName = path.dirname(req.url).toLowerCase();
	var baseName = path.basename(req.url).toLowerCase();
	var extName = path.extname(req.url).toLowerCase();
		
	// handling plain files .html/.js
	if (req.method.toLowerCase() === 'get' && (extName==='.html' || extName==='.js')) {
		fs.readFile(FileDirectory + req.url, function(error, content) {
			if (error) {
				res.writeHead(500);
				res.end();
			}
			else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(content, 'utf-8');
			}
		});
		return;
	}

	//result: undefined mieans that request wasnt handled
	var currentAverage = ""; 
	
	// handling "GET /ocena" requests
	if (req.method.toLowerCase() === 'get' && req.url.toLowerCase()==='/ocena') {
		if (count>0) {
			currentAverage = sum/count;
		}
		else {
			currentAverage = "NaN";
		}
	}
	
	// handling "POST /ocena/1..5" requests
	if (req.method.toLowerCase() === 'post' && dirName === '/ocena') {
		sum = sum + parseInt(baseName);
		count++;
		currentAverage = sum/count;
	}

	if (!!currentAverage) {
		res.writeHead(200, { 'Content-Type': 'text/html' } );
		res.end(""+currentAverage,'utf-8');
		return;
	}

	res.writeHead(404);
	res.end();
}).listen(8888);