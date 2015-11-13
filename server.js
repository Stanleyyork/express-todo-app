// SERVER.js

// APP REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();
var mongoose = require('mongoose');
var Book = require('./models/book');
mongoose.connect('mongodb://localhost/book-app');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
	// WEB Routes
		// Get - Homepage
		app.get('/', function(req, res){
			res.send('Welcome to our books homepage');
		});
		// Get - All Books
		app.get('/books', function(req, res){
			Book.find(function(err, allBooks){
				res.render('books');
			});
		});
		// Get - Single Book
		app.get('/books/:id', function(req, res){
			var singleBookId = req.params.id;
			Book.findOne({_id: singleBookId}, function(err, singleBook){
				res.render('book', {books: singleBook});
			});
		});
	// API Routes
		// Get - API - All Books
		app.get('/api/books', function(req, res){
			Book.find(function(err, allBooks){
				res.json({ books: allBooks});
			});
		});
		// Get - API - Single Book
		app.get('/api/books/:id', function(req, res){
			var singleBookId = req.params.id;
			Book.findOne({_id: singleBookId}, function(err, singleBook){
				res.json(singleBook);
			});
		});
		// Post - API - Single Book
		app.post('/api/books', function(req, res){
			var newBook = new Book(req.body);
			newBook.save(function(err, savedBook){
				res.json(savedBook);
			});
		});
		// Put - API - Single Book
		app.put('/api/books/:id', function(req, res){
			console.log("/api/books/:id");
			console.log(req.body);
			var body = req.body;
			var singleBookId = req.params.id;
			Book.findOne({_id: singleBookId}, function(err, singleBook){
				singleBook.title = body.title;
				singleBook.ranking = body.ranking;
				singleBook.save(function(err, singleBook){
					res.json(singleBook);
				});
			});
		});
		// Delete - API - Single Book
		app.delete('/api/books/:id', function(req, res){
			var singleBookId = req.params.id;
			Book.findOneAndRemove({_id: singleBookId}, function(err, singleBook){
				res.json(singleBook);
			});
		});

// SERVER PORT
var server = app.listen(3000, function(){
	console.log("Server is running");
});