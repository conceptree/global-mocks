var config = require('./config.json');
var express = require('express');
var http = require('http');
var https = require('https');
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
	console.log(menuLength + 1 + ') Exit');
} else {
	console.log('Please set your services on your config file.');
	process.exit();
}

userInput.on('data', (data) => {
	data = Number(data);
	if (data) {
		if (data > menuLength + 1 || data < 0) {
			console.log("Your choice isn't in the list!");
		} else if (data === menuLength + 1) {
			process.exit();
		} else {
			startTheServer(data - 1);
		}
	} else {
		console.log('Please input a number that matches your menu selection.');
	}
});

function startTheServer(serviceIndex) {
	if (services[serviceIndex].type === "http") {
		try{
			var httpServer = http.createServer(app);
		}catch(e){
			console.log('Unable to create server! Please try again!');
			process.exit();
		}
	} else {
		try {
			var httpServer = https.createServer(services[serviceIndex].options, app);
		} catch (e) {
			console.log('Unable to create server, make sure you have the right credentials.');
			process.exit();
		}
	}
	var host = services[serviceIndex].host;
	var port = services[serviceIndex].port;
	httpServer.listen(port, host, function () {
		console.log('Running at ' + httpServer.address().address + ':' + httpServer.address().port);
	});
	startMethods(services[serviceIndex].methods);
}

function startMethods(methods) {
	methods.forEach(function (element) {
		var mocksPath = path.join(appRoot + '/data/', element.mocks);
		var data = fs.readFileSync(mocksPath, 'utf8');
		app[element.type](element.path, (req, res) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			res.send(data);
		});
	});
}