// variables para el Load More y la página actual
let currentPage = 1;
const popularLoadMore = document.getElementById('popular-load-more');
const topRatedLoadMore = document.getElementById('top-rated-load-more');
const upcomingLoadMore = document.getElementById('upcoming-load-more');
const nowPlayingLoadMore = document.getElementById('now-playing-load-more');
const searchLoadMore = document.getElementById('search-load-more');
// ----------------------------------------------

const updatePage = (url, movie) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            banner.classList.add('hidden');
            const movieModel = movie.children[0];
            const twentyMovies = data.results;
            movie.innerHTML = '';

            movie = mapNewMovies(twentyMovies, movieModel, movie);

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
            

        })
        .catch();
}

const mapNewMovies = (twentyMovies, movieModel, movie) => {
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

            movie = mapNewMovies(twentyMovies, movieModel, movie);
        })
        .catch();
}

const onclickPopular = function () {
    popularSection.style.display = 'block';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    popularLoadMore.classList.remove('hidden');
    popularLoadMore.classList.add('load-more');
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
    topRatedLoadMore.classList.add('load-more');
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
    upcomingLoadMore.classList.add('load-more');
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
    nowPlayingLoadMore.classList.add('load-more');
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
    searchLoadMore.classList.add('load-more');
    updatePage(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}`, searchResult);
}

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
    loadMorePages(`https://api.themoviedb.org/3/searh/movie?api_key=${apiKey}&page=${++currentPage}`, searchresult); 
}

// La idea era que no se repita tanto código al tocar los botones del "Load More", se pensó algo así, pero no salió:

// const onclickLoadMore = (category, movieSection) => {
//     loadMorePages(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${++currentPage}`, movieSection); 
// }

// popularLoadMore.onclick = onclickLoadMore('popular', popular);
// topRatedLoadMore.onclick = onclickLoadMore('top-rated', topRated);
// upcomingLoadMore.onclick = onclickLoadMore('upcoming', upcoming);
// nowPlayingLoadMore.onclick = onclickLoadMore('now_playing', nowPlaying);