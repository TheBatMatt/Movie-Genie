//var apiKey = "k_wgnnz7cy";
var apiKey = "k_w5sy0sf0";
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


            if (movie.toUpperCase() === data.results[0].title.toUpperCase()) {

                // variable to add html code dynamically with API results
                var htmlCode = `
                      <h5 class="movietitle">${data.results[0].title}</h5>
                      <div class="estdate">${data.results[0].description}</div>
                      <img src="${data.results[0].image}" width=300px>
                   `

                // Adding html code to html index.
                document.getElementById("movie-poster").innerHTML = htmlCode;


                // Calling the getReviews function using the id recieved from the search api
                getReviews(data.results[0].id);
                getPlot(movie);

                //Local storage to get title to save.
                var previousSearch = JSON.parse(localStorage.getItem("title")) || [];
                if (previousSearch.indexOf(data.results[0].title) == -1) {
                    previousSearch.push(data.results[0].title);
                    localStorage.setItem("title", JSON.stringify(previousSearch));
                    historySearch()
                }

            }
            else {
                var show = document.getElementById("search-button");
                var incorrectTitle = document.getElementById("incorrecttitlecontainer");
            
                show.addEventListener("click", e => incorrectTitle.style.display = "block");
                incorrectTitle.addEventListener("click", e => incorrectTitle.style.display= "none");
         }})

    })
}


//API fetch for plot on OMDB API.
var getPlot = function (movie) {
    apiUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=c83d4e4e"
    var movie = moveInputEl.value.trim();

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            document.getElementById("syn-info").innerText = data.Plot;
            console.log("plot")

        })
    })
};

// api fetch to get reviews
var getReviews = function (id) {
    apiUrl = "https://imdb-api.com/en/API/Reviews/" + apiKey + "/" + id;

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            getRating(data);
            $("#movie-ratings").empty();

            // Loop to append 4 reviews to the reviews div
            for (i = 0; i < 3; i++) {
                if (data.items[i].content) {
                    $("#movie-ratings").append('<p class="ratings">' + data.items[i].rate + ' /10 ' + data.items[i].content + '</p>');
                }
            }
        })
    })
}

// Function to calculate average rating
var getRating = function (data) {

    total = 0;
    sum = 0;

    for (i = 0; i < data.items.length; i++) {
        if (parseFloat(data.items[i].rate) >= 0) {
            sum += parseFloat(data.items[i].rate);
            total++;
        }
    }
    var rating = sum / total;
    $("#user-ratings").empty();
    $("#user-ratings").append('<h3> Average Rating </h3>' +
        '<p>' + rating.toFixed(1) + '</p>');
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

// Clears the default value when the search box is focused
$("#movie-search").focus(function () {
    moveInputEl.value = "";


})