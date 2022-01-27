document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/movies/1')
        .then(res => res.json())
        .then(data1 => {
            displayFirstMovie(data1)
        })
    
        fetch('http://localhost:3000/movies/')
        .then(res => res.json())
        .then(movies => movies.forEach(movie => {
            addingMoviePostersToCarousel(movie)
        }))
    
        let form = document.querySelector('#newFilmRec')
        form.addEventListener('submit', (submission) => {
            submission.preventDefault()
            creatingFormObj(submission)
            form.reset()
        fetch('http://localhost:3000/movies/')
            .then(res => res.json())
            .then(movies => {
                let lastMovieID = (movies.length) + 1
                fetch(`http://localhost:3000/movies/${lastMovieID}`)
                    .then(res2 => res2.json())
                    .then(addedMovie => {
                        addingMoviePostersToCarousel(addedMovie)
                        displaySelectedMovie(addedMovie)
                    })
            })
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
        newUser.textContent = `Recommended by ${movie1.recommendedBy}`
    let newRec = document.querySelector('#recommendation')
        newRec.textContent = `${movie1.recommendation}`
    let newPoster = document.querySelector('#bigPoster')
        newPoster.src = `${movie1.poster}`
    let newWatches = document.querySelector('#number')
        newWatches.textContent = `${movie1.watches}`

    let newButton = document.createElement('button')
        newButton.id = "watchedButton"
        newButton.textContent = "Watched!"

    let unorderedList = document.querySelector('#filmInfo')
    unorderedList.appendChild(newButton)

    newButton.addEventListener('click', () => watchedMovie(movie1))
    
}

function watchedMovie(movie) {
    movie.watches+= 1
        let newWatches = document.querySelector('#number')
            newWatches.textContent = `${movie.watches}`
    
    updateWatches(movie)

}

const leftCaroButton = document.querySelector('#left-button')
const rightCaroButton = document.querySelector('#right-button')
const scrollBarArea = document.querySelector('#my-slider')

leftCaroButton.addEventListener('click', () => {
    scrollBarArea.scrollLeft -= 200; 
})

rightCaroButton.addEventListener('click', () => {
    scrollBarArea.scrollLeft += 200;
})

function addingMoviePostersToCarousel(movie) {
    let overallImagesContainer = document.querySelector('#my-slider')
    let emptyDiv = document.createElement('div') 
    let posterImg = document.createElement('img') 
        posterImg.src = `${movie.poster}`
        emptyDiv.classList.add('slide-container')
        emptyDiv.appendChild(posterImg)
        overallImagesContainer.appendChild(emptyDiv)
        posterImg.addEventListener('click', () => displaySelectedMovie(movie))
}

function displaySelectedMovie(movie) {
    document.querySelector('#watchedButton').remove()
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

    let newButton = document.createElement('button')
        newButton.id = "watchedButton"
        newButton.textContent = "Watched!"

    let unorderedList = document.querySelector('#filmInfo')
        unorderedList.appendChild(newButton)

    newButton.addEventListener('click', () => watchedMovie(movie))
}

function creatingFormObj(submission) {
    let movieObj = {
        title: submission.target.inputTitle.value,
        poster: submission.target.inputPoster.value,
        genre: submission.target.inputGenre.value,
        description: submission.target.inputDescription.value,
        recommendedBy: submission.target.inputUser.value,
        recommendation: submission.target.inputRec.value,
        watches: 1

    }
    postSubUpdate(movieObj)
}

function updateWatches(movie) {
     fetch(`http://localhost:3000/movies/${movie.id}`, {
         method: 'PATCH',
         headers: { 
             'Content-Type': 'application/json'
        }, 
         body:JSON.stringify(movie)
    })
     .then(res => res.json())
     .then(data => console.log(data))
}

function postSubUpdate(movieObj) {
    fetch(`http://localhost:3000/movies/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObj)
    })
}