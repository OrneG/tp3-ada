const apiKey = '77c9a071477a6f097501ea60b348aab8';
const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-title');
const movie = document.getElementById('movies-body');
const movieModel = movie.children[0];

const updatePopular = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            console.log(data);

            const fiveMovies = data.results.slice(0,5);
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

updatePopular();
