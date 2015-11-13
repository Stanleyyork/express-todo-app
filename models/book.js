var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: String,
	ranking: Number
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;