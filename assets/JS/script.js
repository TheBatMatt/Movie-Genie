var apiKey = "k_wgnnz7cy";
var movieFormEl = document.querySelector("#search-form");
var moveInputEl = document.querySelector("#movie-search");
var htmlCode = "";

// Function get movie searched and fetch the search api on submit
var formSubmitHandler = function(event) {
    event.preventDefault();
    var movie = moveInputEl.value.trim();
    searchMovie(movie);
}

// api fetch to get title, image and id
var searchMovie = function(movie) {
    apiUrl = "https://imdb-api.com/en/API/Search/" + apiKey + "/" + movie;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            
            // variable to add html code dynamically with API results
            var htmlCode = `
                      <h5 class="movietitle">${data.results[0].title}</h5>
                      <div class="estdate">${data.results[0].description}</div>
                      <img src="${data.results[0].image}" width=500px>
                   `

            // Adding html code to html index.
              document.getElementById ("movie-poster").innerHTML = htmlCode;

              // Calling the getReviews function using the id recieved from the search api
              getReviews(data.results[0].id);
        })
    })
}

// api fetch to get reviews
var getReviews = function(id) {
    apiUrl = "https://imdb-api.com/en/API/Reviews/" + apiKey + "/" + id;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(reviews) {
            console.log(reviews);

            
        })
    })
}

// Event listner for submitting the search
movieFormEl.addEventListener("submit", formSubmitHandler);