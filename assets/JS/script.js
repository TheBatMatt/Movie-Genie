//var apiKey = "k_wgnnz7cy";
var apiKey = "k_92eskhkc";
var movieFormEl = document.querySelector("#search-form");
var moveInputEl = document.querySelector("#movie-search");
var htmlCode = "";
var previousMovieEl = document.querySelector("#previous-movie");

// Function get movie searched and fetch the search api on submit
var formSubmitHandler = function (event) {
    event.preventDefault();
    var movie = moveInputEl.value.trim();
    searchMovie(movie);
}

// api fetch to get title, image and id
var searchMovie = function (movie) {
    apiUrl = "https://imdb-api.com/en/API/Search/" + apiKey + "/" + movie;

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

            // variable to add html code dynamically with API results
            var htmlCode = `
                      <h5 class="movietitle">${data.results[0].title}</h5>
                      <div class="estdate">${data.results[0].description}</div>
                      <img src="${data.results[0].image}" width=500px>
                   `

            // Adding html code to html index.
            document.getElementById("movie-poster").innerHTML = htmlCode;


            // Calling the getReviews function using the id recieved from the search api
            getReviews(data.results[0].id);
            getPlot();

            //Local storage to get title to save.
            var previousSearch = JSON.parse(localStorage.getItem("title")) || [];
            if (previousSearch.indexOf(data.results[0].title) == -1) {
                previousSearch.push(data.results[0].title);
                localStorage.setItem("title", JSON.stringify(previousSearch));
                historySearch()
            }
        })
    })

}

//API fetch for plot on OMDB API.
var getPlot = function (movie) {
    apiUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=c83d4e4e&plot=full"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            document.getElementById("syn-info").innerText = data.Plot;
        })
    })
}

// api fetch to get reviews
var getReviews = function (id) {
    apiUrl = "https://imdb-api.com/en/API/Reviews/" + apiKey + "/" + id;

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

            // Loop to append 4 reviews to the reviews div
            for (i = 0; i < 3; i++)
             {
                $("#movie-ratings").append('<p class="ratings">' + data.items[i].rate + ' /10 ' + data.items[i].content + '</p>');
            }
        })
    })
}

// Local storage to tie into buttons to go to previous title selections.
var historySearch = function () {
    var previousSearch = JSON.parse(localStorage.getItem("title")) || [];

    //for loop for previous searches to add a button to each one.
    var previousTitleButton = ""
    for (var i = 0; i < previousSearch.length; i++) {
        previousTitleButton += `<li><button name="${previousSearch[i]}"
      class="previous-movie"
      onclick="previousSelection(event)">${previousSearch[i]}</button></li>`
    }
    previousMovieEl.innerHTML = previousTitleButton
}

//event listener to take back to previous search.
previousMovieEl.addEventListener("click", previousSelection)
var previousSelection = function (event) {
    if (event.target.matches(".previous-movie")) {
        var movie = event.target.getAttribute("name")
        searchMovie(movie)
    }
}


// Event listner for submitting the search
movieFormEl.addEventListener("submit", formSubmitHandler);
historySearch();



