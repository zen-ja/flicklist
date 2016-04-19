

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99",
  imageBaseUrl: "http://image.tmdb.org/t/p/"
}


/**
 * Makes an AJAX request to the /discover endpoint of the API, using the 
 * keyword ID that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function discoverMovies(data, callback) {
  // DONE 
  $.ajax({
    url: api.root + "/discover/movie",
    data: data,
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    },
    fail: function() {
      console.log("discover failed");
    }
  });
}


function searchMovies(query, callback) {
  fetchKeywords(
    query, 
    function(keywordsResponse) {
      console.log("fetch succeeded");
      var firstKeywordID = keywordsResponse.results[0].id
      var data = {
        api_key: api.token,
        with_keywords: firstKeywordID
      };
      discoverMovies(data, callback);
    },
    function() {
      console.log("fetchkeywords failed")
      var data = {
        api_key: api.token
      };
      discoverMovies(data, callback);
    }
  );
}


/**
 * Makes an AJAX request to the /search/keyword endpoint of the API,
 * using the query string that was passed in
 *
 * if successful, invokes the supplied callback function, passing in
 * the API's response.
 */
function fetchKeywords(query, cbSuccess, cbError) {
  // DONE
  $.ajax({
    url: api.root + "/search/keyword",
    data: {
      api_key: api.token,
      query: query
    },
    success: cbSuccess,
    error: cbError
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

    // panel heading
    var title = $("<h5></h5>").text(movie.original_title);  
    var panelHeading = $("<div></div>")
      .attr("class", "panel-heading")
      .append(title);

    // panel body
    var poster = $("<img></img>");
    poster.attr("src", posterUrl(movie, "w300"));
    var panelBody = $("<div></div>")
      .attr("class", "panel-body")
      .append(poster)
      .append(button);

    // panel
    var panel = $("<div></div>")
      .attr("class", "panel panel-default")
      .append(panelHeading)
      .append(panelBody);

    // DONE
    // create a button that is overlayed on top of the item view.
    // The button should say "I watched it", and when clicked,
    // removes this movie from the watchlist and re-renders.
    var button = $("<button></button>")
      .text("I watched it")
      .attr("class", "btn")
      .click(function() {
        removeFromWatchlist(movie);
        render();
      })
      .hide();

    // DONE
    // the button should be hidden by default
    // when the mouse is hovered over the itemView, the button should appear
    // and when the mouse leaves again, the button should disappear again

    var itemView = $("<li></li>")
      .append(panel)
      .append(button)
      .mouseover(function() {
        button.show();
      })
      .mouseleave(function() {
        button.hide();
      });

    watchlistElement.append(itemView)
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var overview = $("<p></p>").text(movie.overview);

    var button = $("<button></button>")
      .text("Add to Watchlist")
      .attr("class", "btn btn-primary")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var itemView = $("<li></li>")
      .attr("class", "list-group-item")
      .append(title)
      .append(overview)
      .append(button);

    browseElement.append(itemView);
  });
  
}


function posterUrl(movie, width) {
  return api.imageBaseUrl + width + "/" + movie.poster_path;
}


/**
 * removes the given movie from model.watchlistItems
 */
function removeFromWatchlist(movie) {
  // DONE
  model.watchlistItems = model.watchlistItems.filter(function(item) {
    return item !== movie;
  });
}
