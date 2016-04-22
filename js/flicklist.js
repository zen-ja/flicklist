

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99"
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  // DONE
  
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      console.log(response);
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("fail!");
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // DONE

  var watchlistElement = $("#section-watchlist ul");
  var browseElement = $("#section-browse ul");

  // clear everything
  watchlistElement.empty();
  browseElement.empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>").append(title);
    watchlistElement.append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      });

    var itemView = $("<li></li>").append(title).append(button);
    browseElement.append(itemView);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

