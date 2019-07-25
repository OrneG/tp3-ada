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
            viewAll.innerText = `${data.total_results}`;

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

const onclickPopular = function () {
    popularSection.style.display = 'block';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`, popular);
}

popularNav.onclick = onclickPopular;
popularviewAll.onclick = onclickPopular;

const onclickTopRated = function () {
    topRatedSection.style.display = 'block';
    popularSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`, topRated);
}


topRatedNav.onclick = onclickTopRated;
topRatedViewAll.onclick = onclickTopRated;

const onclickUpcoming = function () {
    upcomingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    searchSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=1`, upcoming);
}

upcomingNav.onclick = onclickUpcoming;
upcomingViewAll.onclick = onclickUpcoming;

const onclickNowPlaying = function () {
    nowPlayingSection.style.display = 'block';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    upcomingSection.style.display = 'none';
    searchSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`, nowPlaying);
}

nowPlayingNav.onclick = onclickNowPlaying;
nowPlayingViewAll.onclick = onclickNowPlaying;

search.onkeypress = function () {
    searchSection.style.display = 'block';
    searchResult.style.display = 'flex';
    upcomingSection.style.display = 'none';
    popularSection.style.display = 'none';
    topRatedSection.style.display = 'none';
    nowPlayingSection.style.display = 'none';
    updatePage(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}`, searchResult);
}

// const getCurrentPage = (url) => {
//     fetch(url)
//     .then(response => response.json())
//     .then (data => {
//         console.log(data);
//         const currentPage = data.total_pages;

//         for (let j = 0; j < currentPage.length; j++) {
//             const paginaActual = currentPage[j];
//         }
//     })
//     .catch();
// }

// getCurrentPage(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`);
