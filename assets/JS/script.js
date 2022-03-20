var apiKey = "k_wgnnz7cy";
var movieFormEl = document.querySelector("#search-form");
var moveInputEl = document.querySelector("#movie-search");

// api fetch to get title, image and id
var searchMovie = function(movie) {
    apiUrl = "https://imdb-api.com/en/API/Search/" + apiKey + "/" + movie;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            // Calling the getReviews function using the id recieved from the search api
            getReviews(data.results[0].id);
        })
    })
}

// api fetch to get reviews
var getReviews = function(id) {
    apiUrl = "https://imdb-api.com/en/API/Reviews/" + apiKey + "/" + id;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}

// Function get movie searched and fetch the search api on submit
var formSubmitHandler = function(event) {
    event.preventDefault();
    var movie = moveInputEl.value.trim();
    searchMovie(movie);
}

// Event listner for submitting the search
movieFormEl.addEventListener("submit", formSubmitHandler);