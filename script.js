document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/movies/4')
        .then(res => res.json())
        .then(data1 => {
            displayFirstMovie(data1)
        })
})

function displayFirstMovie(movie1) {
    let newTitle = document.querySelector('#title')
        newTitle.textContent = `${movie1.title}`
    let newGenre = document.querySelector('#genre')
        newGenre.textContent = `${movie1.genre}`
    let newDescription = document.querySelector('#description')
        newDescription.textContent = `${movie1.description}`
    let newUser = document.querySelector('#user')
        newUser.textContent = `${movie1.recommendedBy}`
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
    watchedButton.remove()

}