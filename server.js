var config = require('./config.json');
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();
var appRoot = __dirname.replace(/\\/g, '/');
var userInput = process.stdin;
var services = config.services;
var menuLength = 0;

userInput.setEncoding('utf-8');
app.use(express.json());

if (services.length > 0) {
	console.log('What service should I start?');
	services.forEach((element, index) => {
		console.log(index + 1 + ') ' + element.name);
		menuLength = index + 1;
	});
} else {
	console.log('No services on your config file.');
	process.exit();
}

userInput.on('data', (data) => {
	data = Number(data);
	if (data) {
		if (data > menuLength || data < 0) {
			console.log("Your choice isn't in the list!");
		}
		startTheServer(data - 1);
	} else {
		console.log('Please input a number that matches your menu selection.');
	}
});

function startTheServer(serviceIndex) {
	var httpServer = http.createServer(app);
	var host = services[serviceIndex].host;
	var port = services[serviceIndex].port;
	httpServer.listen(port, host, function() {
		console.log('Up and running on http://' + host + ':' + port);
	});
	startMethods(services[serviceIndex].methods);
}

function startMethods(methods) {
	methods.forEach(function(element) {
        var mocksPath = path.join(appRoot + '/data/', element.mocks);
        var data = fs.readFileSync(mocksPath, 'utf8');
        app[element.type](element.path, (req, res)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(data);
        });
	});
}
