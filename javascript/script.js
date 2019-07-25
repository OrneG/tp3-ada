const apiKey = '77c9a071477a6f097501ea60b348aab8';
const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-title');
const movieSection = document.getElementsByClassName('movies-section');
const banner = document.getElementById('banner');
const viewAll = document.getElementsByClassName('view-all');
/*nav*/
const popularNav = document.getElementById('popular-nav');
const topRatedNav = document.getElementById('top-rated-nav');
const upcomingNav = document.getElementById('upcoming-nav');
const nowPlayingNav = document.getElementById('now-playing-nav');
/*secciones-general*/
const popularSection = document.getElementById('popular');
const topRatedSection = document.getElementById('top-rated');
const upcomingSection = document.getElementById('upcoming');
const nowPlayingSection = document.getElementById('now-playing');
const searchSection = document.getElementById('search-results');
/*secciones-pelis*/
const popular = document.getElementById('popular-section');
const topRated = document.getElementById('top-rated-section');
const upcoming = document.getElementById('upcoming-section');
const nowPlaying = document.getElementById('now-playing-section');
const searchResult = document.getElementById('search-results-section');

const search = document.getElementById('search');

let textoBusqueda = search.value;

// let timeout;

// search.oninput = () => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//         if (search.value)
//             updatePage(search.value);
//     }, 300);
// }

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

                newMovie.onclick = function () {
                    getMovie(movie1.id);
                };

            }
        })
        .catch();
}

const updatePage = (url, movie) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            banner.classList.add('hidden');
            console.log(data);
            const movieModel = movie.children[0];

            const twentyMovies = data.results;
            movie.innerHTML = '';
            viewAll.innerHTML = `${data.total_results}`;

            for (let i = 0; i < twentyMovies.length; i++) {
                const movie1 = twentyMovies[i];
                const newMovie = movieModel.cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie1.poster_path}`;
                newMovie.children[1].innerText = movie1.title;
                movie.appendChild(newMovie);

                newMovie.onclick = function () {
                    getMovie(movie1.id);
                };
            }
        })
        .catch();
}

popularNav.onclick = function () {
    popularSection.style.display = 'block';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`, popular);
}

topRatedNav.onclick = function () {
    topRatedSection.style.display = 'block';
    popularSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`, topRated);
}

upcomingNav.onclick = function () {
    upcomingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=1`, upcoming);
}

nowPlayingNav.onclick = function () {
    nowPlayingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`, nowPlaying);
}


search.onkeypress = function () {
    searchResult.style.display = 'flex';
    upcomingSection.style.display = 'none';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}`, searchResult);
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