const apiKey = '77c9a071477a6f097501ea60b348aab8';

const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-tittle');

const updatePopular = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (!data.results.length) {
                return;
            }
            console.log(data);
            
            const movie = data.results[0];

            title.innerHTML = movie.title;
            poster.src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`;
        })
        .catch();
}

updatePopular();