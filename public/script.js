$(function() {

	console.log("jquery works!");
	var source = $('#books-list-template').html(); // loads the html from index.html
  	var template = Handlebars.compile(source); // template is a function
  	getBooks();

	// Add Single Book
	$('#new-form').on('submit', function(e){
		e.preventDefault();
		var title = $('#new-title').val();
		var ranking = $('#new-ranking').val();
		console.log(title + ranking);
		addBook(title, ranking);
	});

	// Update Single Book
	$('#edit-form').on('submit', function(e){
		e.preventDefault();
		var id = $('#form-id').val();
		var title = $('#form-title').val();
		var ranking = $('#form-ranking').val();
		updateBook(id, title, ranking);
	});

	// Delete Single Book
	$('#delete').on('click', function(data){
		var id = $('#delete').attr('data-id');
		deleteBook(id);
	});

	function getBooks(){
		$.get('http://localhost:3000/api/books/', function(data){
			var books = data.books;
	    	if(books.length > 0){
	    		var trackHtml = template({book: books});
	    		$('#books-list').append(trackHtml);
	    	} else {
	    		$('#books-list').append("No Results Available");
	    	}
		});
	}

	// addBook function - calls API
	function addBook(title, ranking){
		$.ajax({
	      type: "POST",
	      url: 'http://localhost:3000/api/books/',
	      data: {title: title, ranking: ranking},
	      success: function (data) {
	        console.log("Added new book!");
	      },
	      error: function (error) {
	        console.error(error);
	      }
	    });
	}

	// updateBook function - calls API
	function updateBook(id, title, ranking){
		$.ajax({
	      type: "PUT",
	      url: 'http://localhost:3000/api/books/' + id,
	      data: {title: title, ranking: ranking},
	      success: function (data) {
	        console.log("Updated book!");
	      },
	      error: function (error) {
	        console.error(error);
	      }
	    });
	}

	// deleteBook function - calls API
	function deleteBook(id){
		$.ajax({
			type: "DELETE",
			url: 'http://localhost:3000/api/books/' + id,
			success: function (data) {
	        	console.log("Deleted book!");
		    },
		    error: function (error) {
		    	console.error(error);
		    }
		});
	}

});