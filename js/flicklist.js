

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99" // TODO 0 (DONE) put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {

	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2 (DONE)
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // TODO 7 (DONE)
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();
  
  // TODO 6 (DONE)
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
  	var itemView = $("<li></li>").text(movie.original_title);
  	$("#section-watchlist ul").append(itemView);
  });
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3 (DONE)
		// insert a list item into the <ul> in the browse section
		var title = $("<p></p>").text(movie.original_title);
		var itemView = $("<li></li>").append(title)
		$("#section-browse ul").append(itemView);
		
		// TODO 4 (DONE)
		// the list item should include a button that says "Add to Watchlist"
		var button = $("<button></button>").text("Add to Watchlist").click(function() {
			// TODO 5 (DONE)
			// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
			model.watchlistItems.push(movie);
			render();
		});
		itemView.append(button);
		
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

