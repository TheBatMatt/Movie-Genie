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
            // Calling the getReviews function using the id recieved from the search api

            var htmlCode = `<div class="card mb-3" style="max-width: 540px;">
                <div class="row col-md-12">
                  <div class="col-md-4">
                  </div>
                  <div class="col-md-12">
                    <div class="card-body">
                      <h5 class="card-title">${data.results[0].title}</h5>
                      <div class="estdate">${data.results[0].description}</div>
                      <img src="${data.results[0].image}" width=500px>
                    </div>
                  </div>
                </div>
              </div>`
              console.log("html code");
              document.getElementById ("synopsis").innerHTML = htmlCode;
              console.log ("Push html code");
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