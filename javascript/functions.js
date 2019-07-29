const modalBody = document.getElementById('body');
const modalVisible = document.getElementById('modal');

const modalTitle = document.getElementById('modal-movie-title');
const modalTagline = document.getElementById('modal-tagline');
const modalPlot = document.getElementById('modal-movie-plot');
const modalGenres = document.getElementById('modal-genres');
const modalDate = document.getElementById('modal-date');
const modalBackground = document.getElementById('modal-background')
const modalPoster = document.getElementById('modal-movie-poster');

const headerHamburger = document.getElementById('header-hamburger');
const nav = document.getElementById('nav');
const navUl = document.getElementById('nav-ul');

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
            modalBackground.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`;
            modalPoster.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.poster_path}')`;
            console.log(data);
        })
}

const closeModal = document.getElementById('close-modal');

closeModal.onclick = () => {
    modalVisible.style.visibility = 'hidden';
    modalBody.classList.remove('stop-scrolling');
}

headerHamburger.onclick = () => {
    navUl.classList.toggle('visible');
    nav.classList.toggle('width-100');
    headerHamburger.classList.toggle('hamburger--active');
}