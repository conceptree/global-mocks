var config = require('./config.json');
var express = require('express');
var http = require('http');
var app = express();
var userInput = process.stdin;
userInput.setEncoding('utf-8');
var services = config.services;
var menuLength = 0;

if(services.length > 0){
    console.log("What service should I start?");
    services.forEach(function(element, index){
        console.log(index+1+") "+element.name);
        menuLength = index+1;
    });
}else{
    console.log("No services on your config file.");
    process.exit();
}

userInput.on('data', function(data){
    data = Number(data);
    if(data){
        if(data > menuLength || data < 0){
            console.log("Your choice isn't in the list!");
        }
        startTheServer(data-1);
    }else{
        console.log("Please input a number that matches your menu selection.");
    }

});

function startTheServer(serviceIndex){
    var httpServer = http.createServer(app);
    var host = services[serviceIndex].host;
    var port = services[serviceIndex].port;
    httpServer.listen(port, host, function(){
        console.log("Up and running on http://"+host+":"+port);
    });
}

app.get('/', function(req, res){
    res.header('Content-type', 'application/json');
    return res.end('<h1>Hello, Secure World!</h1>');
});