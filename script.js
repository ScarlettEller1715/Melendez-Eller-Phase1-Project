document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/movies/4')
        .then(res => res.json())
        .then(data1 => {
            displayFirstMovie(data1)
        })
        fetch('http://localhost:3000/movies/')
        .then(res => res.json())
        .then(movies => movies.forEach(movie => {
            addingMoviePostersToCarousel(movie)
        }))

})

function displayFirstMovie(movie1) {
    let newTitle = document.querySelector('#title')
        newTitle.textContent = `${movie1.title}`
    let newGenre = document.querySelector('#genre')
        newGenre.textContent = `${movie1.genre}`
    let newDescription = document.querySelector('#description')
        newDescription.textContent = `${movie1.description}`
    let newUser = document.querySelector('#user')
        newUser.textContent = `Recommended by ${movie1.recommendedBy}`
    let newRec = document.querySelector('#recommendation')
        newRec.textContent = `${movie1.recommendation}`
    let newPoster = document.querySelector('#bigPoster')
        newPoster.src = `${movie1.poster}`
    let newWatches = document.querySelector('#number')
        newWatches.textContent = `${movie1.watches}`

    const watchedButton = document.querySelector('#watchedButton')
    watchedButton.addEventListener('click', () => watchedMovie(movie1))
    
}

function watchedMovie(movie) {
    let watchCount = document.querySelector('#number')
    watchCount.textContent = movie.watches + 1

}

//grabbing the arrow buttons
const leftCaroButton = document.querySelector('#left-button')
const rightCaroButton = document.querySelector('#right-button')
const scrollBarArea = document.querySelector('#my-slider')

leftCaroButton.addEventListener('click', () => {
    scrollBarArea.scrollLeft -= 200; //amount that the slider moves (change to whatever the width of the poster is)
    //add timeout f(x) so that it moves over (by a pixel width at a set time (ex every two seconds))
})

rightCaroButton.addEventListener('click', () => {
    scrollBarArea.scrollLeft += 200;
})

function addingMoviePostersToCarousel(movie) {

    let sliderArea = document.querySelector('#slider-area')
    let sliderContainer = document.querySelector('.slider-container')
    let overallImagesContainer = document.querySelector('#my-slider')



    let emptyDiv = document.createElement('div') //slide-container
    let posterImg = document.createElement('img') //slide-image


    posterImg.src = `${movie.poster}`
    emptyDiv.classList.add('slide-container')

    emptyDiv.appendChild(posterImg)
    overallImagesContainer.appendChild(emptyDiv)

    posterImg.addEventListener('click', () => displaySelectedMovie(movie))

}

function displaySelectedMovie(movie) {
    let newTitle = document.querySelector('#title')
        newTitle.textContent = `${movie.title}`
    let newGenre = document.querySelector('#genre')
        newGenre.textContent = `${movie.genre}`
    let newDescription = document.querySelector('#description')
        newDescription.textContent = `${movie.description}`
    let newUser = document.querySelector('#user')
        newUser.textContent = `Recommended by ${movie.recommendedBy}`
    let newRec = document.querySelector('#recommendation')
        newRec.textContent = `${movie.recommendation}`
    let newPoster = document.querySelector('#bigPoster')
        newPoster.src = `${movie.poster}`
    let newWatches = document.querySelector('#number')
        newWatches.textContent = `${movie.watches}`

    const watchedButton = document.querySelector('#watchedButton')
    watchedButton.addEventListener('click', () => watchedMovie(movie))
}
