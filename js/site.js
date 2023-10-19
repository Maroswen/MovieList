const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmJlZTQzM2NjMGZhNTVjMGZkMmM4MWY4OTE4Mjg4MSIsInN1YiI6IjY1MmVlMWI5MDI0ZWM4MDExZTM1OWJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jUbBiioA3SntGA1a32Vc0FMX6TL8Xn-uviihJIUYksM"

async function getMovies() { //this function aims to grab the data from the API
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {  
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json(); //reads the content of what they sent us, turns it into a js object. 
        //This is where the movie information comes from that we link in the display movies function.

        

        return data;

    } catch(error) {
        Swal.fire({
            backdrop: false,
            title: 'Oops!',
            text: 'Something went wrong reaching the TMDB API.',
            icon: 'error'
        });
    }
}

async function getMovie(id) { //this function aims to grab the data from the API
    try {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {  
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json(); //reads the content of what they sent us, turns it into a js object. 
        //This is where the movie information comes from that we link in the display movies function.

        

        return data;

    } catch(error) {
        Swal.fire({
            backdrop: false,
            title: 'Oops!',
            text: 'Something went wrong reaching the TMDB API.',
            icon: 'error'
        });
    }
}

async function displayMovies() {

    let data = await getMovies();

    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');

    let movies = data.results;

    for (let i = 0; i < movies.length; i++) {
        
        let movie = movies[i]; //takes movie and labels its variable "movie"

        let movieCard = moviePosterTemplate.content.cloneNode(true);

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        let movieTitleElement = movieCard.querySelector('.card-body > h5');
        movieTitleElement.textContent = movie.title;

        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;

        //setAttribute allows me to grab the data and give it a Attribute name in the next function
        let movieButton = movieCard.querySelector('.btn-primary');
        movieButton.setAttribute('data-movieId', movie.id);

        movieListDiv.appendChild(movieCard);
    }

}

async function showMovieDetails(clickedBtn) {

    let movieId = clickedBtn.getAttribute('data-movieId');

    let movie = await getMovie(movieId);

    movie;

    let modalHeader = document.querySelector('#movieModal .modal-header');
    modalHeader.innerHTML = `<h2>${movie.title}</h2>`;

    let modalBody = document.querySelector('#movieModal .modal-body #row1');
    modalBody.innerHTML = `<b>Score:</b>&nbsp; ${movie.vote_average}`;

    let modalBody2 = document.querySelector('#movieModal .modal-body #row2');
    modalBody2.innerHTML = `${movie.vote_count}&nbsp;people rated this movie`;

    let modalBody3 = document.querySelector('#movieModal .modal-body #row3');
    modalBody3.innerHTML = `<b>Release Date:</b>&nbsp; ${movie.release_date}`;

    let modalBody4 = document.querySelector(`#movieModal .modal-body #row4`);
    modalBody4.innerHTML = `<b>Runtime:</b>&nbsp; ${movie.runtime} Minutes`;

    let modalBody6 = document.querySelector('#movieModal .modal-body #row6');
    modalBody6.innerHTML = `${movie.tagline}`

    let modalBody7 = document.querySelector('#movieModal .modal-body #row7');
    modalBody7.innerHTML = `<b>About the movie:</b>&nbsp;`;

    let modalBody8 = document.querySelector('#movieModal .modal-body #row8');
    modalBody8.innerHTML = `${movie.overview}`;
    // initializing the variable for the for loop

    let genreList = '';

    for (let i = 0; i < movie.genres.length; i++) {
        let genres = movie.genres[i];
        genreList += ' ' + genres.name;

    }
    
    document.querySelector('#movieModal .modal-body #row5').innerHTML = `<b>Genre:</b>&nbsp; ${genreList}`;

    
    //imgs

    let modalHeaderImg = document.querySelector('#movie-poster-img');
    modalHeaderImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;





    // TESTING: put the movie ID and TMDB Rating in the modal body
    // let modalBody = document.querySelector('#movieModal .modal-body');
    // modalBody.textContent = `${movie}`;



    // TODO:

    // put those details into my modal

}

// <!-- Modal -->
//     <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h1 class="modal-title fs-5" id="movieModalLabel">Modal title</h1>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                     ...
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="button" class="btn btn-primary">Save changes</button>
//                 </div>
//             </div>
//         </div>
//     </div>


