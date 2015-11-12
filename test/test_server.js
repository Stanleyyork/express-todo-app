var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

it('should post a single book', function(done) {
  request.post(
    {
      url: baseUrl + '/api/books',
      form: {
        title: 'WDI Textbook',
        ranking: 3
      }
    },
    function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    }
  );
});

// testing for all books
it('should return statusCode 200 for get all books', function(done) {
  request(baseUrl + '/api/books', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

// testing for a single book
it('should return statusCode 200 for get single book', function(done) {
    request(baseUrl + '/api/books/:id', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
});