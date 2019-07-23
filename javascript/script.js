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
/*secciones-pelis*/
const popular = document.getElementById('popular-section');
const topRated = document.getElementById('top-rated-section');
const upcoming = document.getElementById('upcoming-section');
const nowPlaying = document.getElementById('now-playing-section');

// let timeout;

// search.oninput = () => {
//     clearTimeout(timeout);

//     timeout = setTimeout(() => {
//         if (search.value)
//             updateArtist(search.value);
//             updateAlbums(search.value);
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
            }
        })
        .catch();
}

popularNav.onclick = function () {
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, popular);
}

topRatedNav.onclick = function () {
    popularSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`, topRated);
}

upcomingNav.onclick = function () {
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, upcoming);
}

nowPlayingNav.onclick = function () {
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`, nowPlaying);
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