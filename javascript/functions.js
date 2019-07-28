const modalBody = document.getElementById('body');
const modalVisible = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const outsideModal = document.getElementById('outside');


const modalTitle = document.getElementById('modal-movie-title');
const modalTagline = document.getElementById('modal-tagline');
const modalPlot = document.getElementById('modal-movie-plot');
const modalGenres = document.getElementById('modal-genres');
const modalDate = document.getElementById('modal-date');
const modalBackground = document.getElementById('modal-background')
const modalPoster = document.getElementById('modal-movie-poster');

const getMovie = movieId => {
    modalVisible.style.visibility = 'visible';
    modalBody.classList.add('stop-scrolling');
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {

            const updateGenres = genresList => {
                modalGenres.innerHTML = genresList.map(genre => genre.name).join(', ');
            }
            updateGenres(data.genres);

            modalTitle.innerHTML = data.title;
            modalTagline.innerHTML = data.tagline;
            modalPlot.innerHTML = data.overview;
            modalDate.innerText = data.release_date;
            if (data.backdrop_path != null) {
                modalBackground.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`;
            } else {
                modalBackground.style.backgroundImage = "url('img/no-image.png')";
            }
            if (data.poster_path != null) {
                modalPoster.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.poster_path}')`;
            } else {
                modalPoster.style.backgroundImage = "url('img/no-image.png')";
            }

            console.log(data);
        })
}



outsideModal.onclick = () => {
    modalVisible.style.visibility = 'hidden';
    modalBody.classList.remove('stop-scrolling');
};


closeModal.onclick = () => {
    modalVisible.style.visibility = 'hidden';
    modalBody.classList.remove('stop-scrolling');
}

