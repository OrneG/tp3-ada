const modalBody = document.getElementById('body');
const modal = document.getElementById('modal');

const modalTitle = document.getElementById('modal-movie-title');
const modalTagline = document.getElementById('modal-tagline');
const modalPlot = document.getElementById('modal-movie-plot');
const modalGenres = document.getElementById('modal-genres');
const modalDate = document.getElementById('modal-date');
const modalBackground = document.getElementById('modal-background')
const modalPoster = document.getElementById('modal-movie-poster');

const getMovie = movieId => {
    modal.classList.add('modal-body');
    modalBody.classList.add('stop-scrolling');
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            modalTitle.innerHTML = data.title;
            modalTagline.innerHTML = data.tagline;
            modalPlot.innerHTML = data.overview;
            modalBackground.src = `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`;
            modalPoster.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
            console.log(data);
        })
}

const closeModal = document.getElementById('close-modal');

closeModal.onclick = () => {
    modal.classList.remove('modal-body');
}

