var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/login', function(req, res) {
	res.send('<h1>login plz</h1>');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
