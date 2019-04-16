var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there!', time: Date() });
});

app.get('/topic', function(req, res) {
	var topics = ['java is ...', 'node is ...', 'express is ...'];
	var output = `
	<a href="topic?id=0">java</a><br>
	<a href="topic?id=1">node</a><br>
	<a href="topic?id=2">express</a><br>
	${topics[req.query.id]}
	`;
	res.send(output);
});

app.get('/login', function(req, res) {
	res.send('<h1>login plz</h1>');
});

app.get('/dynamic', function(req, res) {
	var time = Date();
	var lis = '';
	for (var i = 0; i < 5; i++) {
		lis = lis + '<li>coding</li>';
	}
	var output = `<!DOCTYPE html>
	<html>
		<head>
			<meta charset='utf=8'>
			<title></title>
		</head>
		<body>
			hi
			${lis}
			${time}
		</body>
	</html>
	
	`;
	res.send(output);
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
