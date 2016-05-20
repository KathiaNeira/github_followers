// http://frontendlabs.io/2776--como-crear-un-servidor-con-expressjs

var express = require('express');
var app = express();

//llamando a los archivos estaticos
app.use(express.static(__dirname + '/public'));

// llamamos al index
app.get('/',function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.listen(3000, function(){
	console.log('Server Express Ready!');
});
