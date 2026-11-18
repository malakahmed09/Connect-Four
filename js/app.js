// variable 

// chached 
const instructionsModalEl = document.querySelector('#instructions')
const openInstructionsButtonEl = document.querySelector('#open-instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')
const boardEl = document.querySelector('#board')

const startButtonEl = document.querySelector('#start')
const homePageEl = document.querySelector('.homePage')
const gamePageEl = document.querySelector('#gamePage')

const backButtonEl = document.querySelector('#back')


// functions 
// add the board game 

function createBoard(){
    for (let i=0; i<42; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')
        boardEl.appendChild(cell)
    }
}

createBoard()

// event listener 
openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.close()
})

startButtonEl.addEventListener('click', () => {
    homePageEl.hidden = true
    gamePageEl.hidden = false
    backButtonEl.hidden = false
})

backButtonEl.addEventListener('click', () => {
    homePageEl.hidden = false
    gamePageEl.hidden = true
    backButtonEl.hidden = true
})

