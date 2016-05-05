

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99", // TODO 0 add your api key
  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    var baseImageUrl = "http://image.tmdb.org/t/p/w300/";
    return baseImageUrl + movie.poster_path; 
  }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search/keywords endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/keywords",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var itemView = watchlistItemView(movie);
    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var overview = $("<p></p>").text(movie.overview);

    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1)
      .attr("class", "btn btn-primary");

    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button);
      
    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}

function watchlistItemView(movie) {
  var title = $("<h6></h6>")
    .text(movie.original_title);
    
  // movie poster
  var poster = $("<img></img>")
    .attr("src", api.posterUrl(movie))
    .attr("class", "img-responsive");

  // "I watched it" button
  var button = $("<button></button>")
    .text("I watched it")
    .attr("class", "btn btn-danger")
    .click(function() {
      var index = model.watchlistItems.indexOf(movie);
      model.watchlistItems.splice(index, 1);
      render();
    });

  // panel heading contains the title
  var panelHeading = $("<div></div>")
    .attr("class", "panel-heading")
    .append(title);
  
  // panel body contains the poster and button
  var panelBody = $("<div></div>")
    .attr("class", "panel-body")
    .append( [poster, body] );

  // list item is a panel, contains the panel heading and body
  return $("<li></li>")
    .append( [panelHeading, panelBody] )
    .attr("class", "panel panel-default");
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
