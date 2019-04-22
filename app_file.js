var express = require('express');
var app = express();

fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('views', './views_file');

app.get('/topic/new', function(req, res) {
	fs.readdir('data', function(err, files) {
		if (err) {
			res.status(500).send('server err');
			console.log(err);
		}
		res.render('new', { topics: files });
	});
});

app.get(['/topic', '/topic/:id'], function(req, res) {
	fs.readdir('data', function(err, files) {
		if (err) {
			res.status(500).send('server err');
			console.log(err);
		}
		var id = req.params.id;
		if (id) {
			fs.readFile('data/' + id, 'utf8', function(err, data) {
				if (err) {
					res.status(500).send('server err');
					console.log(err);
				}
				res.render('view', { title: id, topics: files, description: data });
			});
		} else {
			res.render('view', { topics: files, title: 'welcom', description: 'hi' });
		}
	});
});

app.post('/topic', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/' + title, description, function(err) {
		if (err) {
			res.status(500).send('server err');
			console.log(err);
		}
		res.redirect('/topic/' + title);
	});
});

app.listen(3000, function() {
	console.log('app listening on port 3000!');
});
