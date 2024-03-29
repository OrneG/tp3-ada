/* Load More */
let currentPage = 1;
const popularLoadMore = document.getElementById('popular-load-more');
const topRatedLoadMore = document.getElementById('top-rated-load-more');
const upcomingLoadMore = document.getElementById('upcoming-load-more');
const nowPlayingLoadMore = document.getElementById('now-playing-load-more');
const searchLoadMore = document.getElementById('search-load-more');
/* Banner */
const banner = document.getElementById('banner');
const bannerTitle = document.getElementById('banner-title');


const updatePage = (url, movie) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length !== 0) {
                banner.classList.add('hidden');
                const movieModel = movie.children[0];
                const twentyMovies = data.results;
                movie.innerHTML = '';

                movie = mapNewMovies(twentyMovies, movieModel, movie);

                checkMoreThanTwienty(data.results.length);

                const getResultsNumber = type => {
                    if (type === popular) {
                        popularviewAll.innerHTML = `<a class="view-all">${data.total_results} results</a>`;
                    } else if (type === topRated) {
                        topRatedViewAll.innerHTML = `<a class="view-all">${data.total_results} results</a>`;
                    } else if (type === upcoming) {
                        upcomingViewAll.innerHTML = `<a class="view-all">${data.total_results} results`;
                    } else if (type === nowPlaying) {
                        nowPlayingViewAll.innerHTML = `<a class="view-all">${data.total_results} results`;
                    } else if (type === searchResult) {
                        searchViewAll.innerHTML = `<a class="view-all">${data.total_results} results`;
                    }
                };
                getResultsNumber(movie);
            } else {
                banner.classList.remove('hidden');
                bannerTitle.innerHTML = 'Nothing Found';
                searchSection.style.display = 'none';
                searchResult.style.display = 'none';
            }
        })
        .catch();
}


const mapNewMovies = (twentyMovies, movieModel, movie) => {
    for (let i = 0; i < twentyMovies.length; i++) {
        const movie1 = twentyMovies[i];
        const newMovie = movieModel.cloneNode(true);
        if (movie1.poster_path != null) {
            newMovie.children[0].src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie1.poster_path}`;
        } else {
            newMovie.children[0].src = "img/no-image.png";
        }
        newMovie.children[1].innerText = movie1.title;
        movie.appendChild(newMovie);

        newMovie.onclick = function () {
            getMovie(movie1.id);
        };
    }
    return movie;
}

const loadMorePages = (url, movie) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            banner.classList.add('hidden');
            const movieModel = movie.children[0];
            const twentyMovies = data.results;

            checkMoreThanTwienty(data.results.length);

            movie = mapNewMovies(twentyMovies, movieModel, movie);
        })
        .catch();
}

const checkMoreThanTwienty = (results) => {
    if (results <= 19) {
        searchLoadMore.style.visibility = 'hidden';
    } else {
        searchLoadMore.style.visibility = 'visible';
    }
}

/* Onclick for each Section */

const onclickPopular = function () {
    popularSection.style.display = 'block';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    popularLoadMore.classList.remove('hidden');
    updatePage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`, popular);
}

popularNav.onclick = onclickPopular;
popularviewAll.onclick = onclickPopular;

const onclickTopRated = function () {
    topRatedSection.style.display = 'block';
    popularSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    topRatedLoadMore.classList.remove('hidden');
    updatePage(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`, topRated);
}

topRatedNav.onclick = onclickTopRated;
topRatedViewAll.onclick = onclickTopRated;

const onclickUpcoming = function () {
    upcomingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    upcomingLoadMore.classList.remove('hidden');
    updatePage(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${currentPage}`, upcoming);
}

upcomingNav.onclick = onclickUpcoming;
upcomingViewAll.onclick = onclickUpcoming;

const onclickNowPlaying = function () {
    nowPlayingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    searchSection.style.display = 'none';
    nowPlayingLoadMore.classList.remove('hidden');
    updatePage(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`, nowPlaying);
}

nowPlayingNav.onclick = onclickNowPlaying;
nowPlayingViewAll.onclick = onclickNowPlaying;

search.onchange = function () {
    searchSection.style.display = 'block';
    searchResult.style.display = 'flex';
    upcomingSection.style.display = 'none';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchLoadMore.classList.remove('hidden');
    updatePage(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}`, searchResult);
}


/* Onclick for each Load More */

popularLoadMore.onclick = () => {
    loadMorePages(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${++currentPage}`, popular);
}
topRatedLoadMore.onclick = () => {
    loadMorePages(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${++currentPage}`, topRated);
}
upcomingLoadMore.onclick = () => {
    loadMorePages(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${++currentPage}`, upcoming);
}
nowPlayingLoadMore.onclick = () => {
    loadMorePages(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${++currentPage}`, nowPlaying);
}
searchLoadMore.onclick = () => {
    loadMorePages(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}&page=${++currentPage}`, searchResult);
}

// La idea era que no se repita tanto código al tocar los botones del "Load More", se pensó algo así, pero no salió:

// const onclickLoadMore = (category, movieSection) => {
//     loadMorePages(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${++currentPage}`, movieSection); 
// }

// popularLoadMore.onclick = onclickLoadMore('popular', popular);
// topRatedLoadMore.onclick = onclickLoadMore('top-rated', topRated);
// upcomingLoadMore.onclick = onclickLoadMore('upcoming', upcoming);
// nowPlayingLoadMore.onclick = onclickLoadMore('now_playing', nowPlaying);