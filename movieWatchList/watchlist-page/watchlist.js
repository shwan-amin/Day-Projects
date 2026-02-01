// ELEMENT VARS
let watchList = JSON.parse(localStorage.getItem('watchList')) || [];
let movieData = JSON.parse(localStorage.getItem('movieData')) || [];
const main = document.getElementsByTagName('main')[0];

const renderWatchlist = () => {
    if (watchList.length === 0) {
        // Placeholder if no movies in watchlist
        main.innerHTML = 
        `
        <div class="search-placeholder" id="search-placeholder">
            <p>Your watchlist is looking a little empty...</p>
            <button class="add-watch" id="open-watchlist">
                <img class="add-img" src="../img/icon-1.png">
                <p class="add-txt">Let's add some movies!</p>
            </button>
        </div>
        `
    } else {
        main.innerHTML = '';
        watchList.forEach((imdbID) => {
            const mov = movieData.find((m) => m.imdbID === imdbID);
            
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
                        <button class="add-watch" id="remove-watch-btn" data-imdb=${mov.imdbID}>
                            <img class="add-img" src="../img/rev.png">
                            <p class="add-txt">Remove</p>
                        </button>
                    </div>
    
                    <p class="plot-txt">${mov.Plot}</p>
                </div>
            </div>
            `
        });
    }
}

// EVENT HANDLER
document.addEventListener('click', (e) => {
    // Watchlist placeholder event listener
    if (e.target.closest("#open-watchlist")) {
        window.location.href = "../movie-page/movie.html"
    }

    // Remove button event listener 
    else if (e.target.closest("#remove-watch-btn")) {
        console.log("REMOVED");
        removeFromList(e.target.dataset.imdb);
    }
});

// Remove an item from watchlist and set to local storage
const removeFromList = (imdbID) => {
    const idx = watchList.indexOf(`${imdbID}`);
    if (idx != -1) watchList.splice(idx, 1);
    localStorage.setItem('watchList', JSON.stringify(watchList));
    renderWatchlist();
    return;
}

renderWatchlist();
