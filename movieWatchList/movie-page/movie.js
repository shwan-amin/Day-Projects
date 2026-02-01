// API KEY
const API_KEY = "3b315aaf";

// DATA - LOAD FROM LOCALSTORAGE
let movieData = JSON.parse(localStorage.getItem('movieData')) || [];
let watchList = JSON.parse(localStorage.getItem('watchList')) || [];


// ELEMENT VARS
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviePlaceholder = document.getElementById('search-placeholder');
const main = document.getElementsByTagName('main')[0];


// EVENT LISTNERS

// Search API Handle
searchBtn.addEventListener('click', async () => {
    // API Call
    let res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInput.value}`);
    let data = await res.json();

    main.innerHTML = "";
    
    // Handle Invalid Call
    if (data.Response === "False") {
        searchInput.value = "Movie not found!"
    }

    moviePlaceholder.style.display = 'none';
    
    data.Search.forEach(async (mov) => {
        res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${mov.Title}`);
        data = await res.json();

        // Render if valid response
        if (data.Response === "True") {
            renderHTML(data);
        }
    });
    
});

// Render HTML of Search
const renderHTML = (mov) => {

    // Push the movie to an array
    movieData.push(mov);
    console.log(movieData);

    main.innerHTML += 
    `
    <div class="movie-container" id="movie-container">
        <img class="movie-poster" src=${mov.Poster} alt="Movie Poster">
        <div class="movie-txt-container">
            <div class="title-container">
                <h2 class="movie-title">${mov.Title}</h2>
                <p class="movie-rating">⭐️ ${mov.imdbRating}</p>
            </div>

            <div class="info-container">
                <p class="runtime">${mov.Runtime}</p>
                <p class="genre">${mov.Genre}</p>
                <button class="add-watch" id="add-watch-btn" data-imdb=${mov.imdbID}>
                    <img class="add-img" src="../img/icon-1.png">
                    <p class="add-txt">Watchlist</p>
                </button>
            </div>

            <p class="plot-txt">${mov.Plot}</p>
        </div>
    </div>
    `
    return;
}

// Add to Watchlist Handle
document.addEventListener('click', (e) => {
    const button = e.target.closest('.add-watch');
    if (button) {
        const imdbID = button.dataset.imdb;

        if (!watchList.includes(imdbID)) {
            watchList.push(imdbID);

            // Push watchlist to local store
            localStorage.setItem('watchList', JSON.stringify(watchList));
            localStorage.setItem('movieData', JSON.stringify(movieData));
            console.log("Added");
        }  
    }
    return;
});

