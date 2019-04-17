var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there!', time: Date() });
});

app.get('/form', function(req, res) {
	res.render('form');
});

app.get('/form_receiver', function(req, res) {
	var title = req.query.title;
	var description = req.query.description;
	res.send(title + ',' + description);
});

app.post('/form_receiver', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	res.send(title + ',' + description);
});

app.get('/topic/:id', function(req, res) {
	var topics = ['java is ...', 'node is ...', 'express is ...'];
	var output = `
	<a href="0">java</a><br>
	<a href="1">node</a><br>
	<a href="2">express</a><br>
	${topics[req.params.id]}
	`;
	res.send(output);
});

app.get('/topic/:id/:mode', function(req, res) {
	res.send(req.params.id + ',' + req.params.mode);
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
