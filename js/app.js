/*---------------------------- Variables (state) ----------------------------*/

let board = Array(42).fill(null)
let currentPlayer = 'Player 1'
let gameOver = false 
let moveCount = 0


/*------------------------ Cached Element References ------------------------*/

const instructionsModalEl = document.querySelector('#instructions')
const openInstructionsButtonEl = document.querySelector('#open-instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')
const boardEl = document.querySelector('#board')

const startButtonEl = document.querySelector('#start')
const homePageEl = document.querySelector('.homePage')
const gamePageEl = document.querySelector('#gamePage')

const backButtonEl = document.querySelector('#back')

const turnEl = document.querySelector('#turn')


/*-------------------------------- Functions --------------------------------*/
// add the board game 

function createBoard(){
    for (let i=0; i<42; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')

        cell.addEventListener('click', ()=> {
            // drop in the selected column
            dropDisc(i%7)
        })

        boardEl.appendChild(cell)
    }
}

// add switch player 
function switchPlayer() {
    if (gameOver === false) {
        if (currentPlayer === 'Player 1') {
            currentPlayer = 'Player 2'
        } else {
            currentPlayer = 'Player 1'
        }

        turnEl.textContent = `${currentPlayer}'s turn`
    }
}

// add drop method
function dropDisc(column){

    const cellEl = document.querySelectorAll('.cell')

    for (let row=5; row>=0; row--){
        // calculation of the index 
        let index = row * 7 + column

        if (board[index]=== null){
            board[index] = currentPlayer

            if (currentPlayer === 'Player 1') {
                cellEl[index].classList.add('player1-disc')
                } else {
                    cellEl[index].classList.add('player2-disc')
                }

                moveCount++
                switchPlayer()
                break
        }
    }
    }

    // calling the function 
    createBoard()

/*----------------------------- Event Listeners -----------------------------*/

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

