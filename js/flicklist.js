

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99",
  // TODO
  imageBaseUrl: "TODO"
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
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("fail!");
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  // TODO

  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("search failed");
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  var watchlistElement = $("#section-watchlist ul");
  var browseElement = $("#section-browse ul");

  // clear everything
  watchlistElement.empty();
  browseElement.empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    // TODO
    // create a bootstrap panel for each watchlist item.
    // The movie title should go in the panel heading.
    // The panel body should contain a poster image,
    // and also a button to cross the item off the watchlist.

    var title = $("<h4></h4>").text(movie.original_title);
    var itemView = $("<li></li>").append(title);
    watchlistElement.append(itemView);
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
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    // TODO
    // use Bootstrap to improve the style of these list items
    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button);

    browseElement.append(itemView);
  });
  
}



function posterUrl(movie, width) {
  // TODO
  
}
