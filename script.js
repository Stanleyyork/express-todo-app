$(function() {

	$('#edit-form').on('submit', function(data){
		e.preventDefault();
    	var updatedBook = $(this).serialize();
    	console.log(updatedBook);
	});

});