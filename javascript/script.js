const apiKey = '77c9a071477a6f097501ea60b348aab8';
const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-title');
const movieSection = document.getElementsByClassName('movies-section');
const popular = document.getElementById('popular-section');
const topRated = document.getElementById('top-rated-section');
const upcoming = document.getElementById('upcoming-section');
const nowPlaying = document.getElementById('now-playing-section');

const getMovies = (url, movie) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            console.log(data);
            const movieModel = movie.children[0];

            const fiveMovies = data.results.slice(0, 5);
            movie.innerHTML = '';

            for (let i = 0; i < fiveMovies.length; i++) {
                const movie1 = fiveMovies[i];
                const newMovie = movieModel.cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie1.poster_path}`;
                newMovie.children[1].innerText = movie1.title;
                movie.appendChild(newMovie);
            }
        })
        .catch();
}

const updatePopular = () => {
    getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, popular)
}

updatePopular();

const updateTopRated = () => {
    getMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`, topRated)
}

updateTopRated();

const updateUpcomingMovies = () => {
    getMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, upcoming)
}

updateUpcomingMovies();

const updateNowPlaying = () => {
    getMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`, nowPlaying)
}

updateNowPlaying();