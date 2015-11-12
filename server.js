// SERVER.js

// APP REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// DATA
var myBooks = [
	{_id: 1, title: "The Giver", ranking: 2},
	{_id: 2, title: "Having Fun with Ruby", ranking: 3},
	{_id: 3, title: "Capital in the 21st Century", ranking: 1},
];

//ROUTES
	// WEB Routes
		// Get - Homepage
		app.get('/', function(req, res){
			res.send('Welcome to our books homepage');
		});
		// Get - All Books
		app.get('/books', function(req, res){
			res.render('books', {books: myBooks});
		});
		// Get - Single Book
		app.get('/books/:id', function(req, res){
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			})[0];
			res.render('book', {books: singleBook});
		});
		// Post - Single Book
		app.post('/books', function(req, res){
			console.log(req.body);
			var newBook = req.body;
			newBook._id = 4;
			myBooks.push(newBook);
			res.json(newBook);
		});
		// Put - Single Book
		app.put('/books/:id', function(req, res){
			var body = req.body;
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			});
			singleBook[0].title = body.title;
			singleBook[0].ranking = body.ranking;
			//res.json(singleBook);
		});
		// Delete - Single Book
		app.delete('/books/:id', function(req, res){
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			});
			myBooks.splice(myBooks.indexOf(singleBook[0]), 1);
			res.json(myBooks);
		});
	// API Routes
		// Get - API - All Books
		app.get('/api/books', function(req, res){
			res.json(myBooks);
		});
		// Get - API - Single Book
		app.get('/api/books/:id', function(req, res){
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			})[0];
			res.json(singleBook);
		});
		// Post - API - Single Book
		app.post('/api/books', function(req, res){
			console.log(req.body);
			var newBook = req.body;
			newBook._id = 4;
			myBooks.push(newBook);
			res.json(newBook);
		});
		// Put - API - Single Book
		app.put('/api/books/:id', function(req, res){
			var body = req.body;
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			});
			singleBook[0].title = body.title;
			singleBook[0].ranking = body.ranking;
			console.log(myBooks);
			res.json(singleBook);
		});
		// Delete - API - Single Book
		app.delete('/api/books/:id', function(req, res){
			var singleBookId = parseInt(req.params.id);
			var singleBook = myBooks.filter(function(book){
				return book._id == singleBookId;
			});
			myBooks.splice(myBooks.indexOf(singleBook[0]), 1);
			res.json(myBooks);
		});

// SERVER PORT
var server = app.listen(3000, function(){
	console.log("Server is running");
});