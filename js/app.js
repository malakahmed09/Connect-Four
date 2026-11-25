/*---------------------------- Variables (state) ----------------------------*/

let board = Array(42).fill(null)
let currentPlayer = 'Player 1'
let gameOver = false
let moveCount = 0
let player1Score = 0
let player2Score = 0
let player1Name = 'Player 1'
let player2Name = 'Player 2'

let startTime = 0
let timerInterval = null

/*------------------------ Cached Element References ------------------------*/

const instructionsModalEl = document.querySelector('#instructions')
const openInstructionsButtonEls = document.querySelectorAll('.open-instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')
const boardEl = document.querySelector('#board')

const startButtonEl = document.querySelector('#start')
const homePageEl = document.querySelector('.homePage')
const gamePageEl = document.querySelector('#gamePage')

const backButtonEl = document.querySelector('#back')

const turnEl = document.querySelector('#turn')

const resetButton = document.querySelector('#reset')
const playAgainGameButtonEl = document.querySelector('#play-again-game')


const player1scoreEl = document.querySelector('#player1-score')
const player2scoreEl = document.querySelector('#player2-score')

const player1ScoreNameEl = document.querySelector('#player1-score-name')
const player2ScoreNameEl = document.querySelector('#player2-score-name')

const player1NameInputEl = document.querySelector('#player1-name')
const player2NameInputEl = document.querySelector('#player2-name')

const winnerModalEl = document.querySelector('#winner-modal')
const winnerMessageEl = document.querySelector('#winner-message')
const winnerNameEl = document.querySelector('#winner-name')

const playAgainButtonEl = document.querySelector('#play-again')
const resetGameButtonEl = document.querySelector('#reset-game')
const goHomeButtonEl = document.querySelector('#go-home')

const timerEl = document.querySelector('#timer')
const winnerTimeEl = document.querySelector('#winner-time')


/*-------------------------------- Functions --------------------------------*/
// add the board game 

function createBoard() {
    for (let i = 0; i < 42; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        cell.addEventListener('click', () => {
            // drop in the selected column
            dropDisc(i % 7)
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

        turnEl.textContent = `${getPlayerName()}'s turn`
    }
}

// add drop method
function dropDisc(column) {

    if (gameOver === true) {
        return
    }

    const cellEl = document.querySelectorAll('.cell')

    for (let row = 5; row >= 0; row--) {

        // calculation of the index 
        let index = row * 7 + column

        if (board[index] === null) {
            board[index] = currentPlayer

            if (currentPlayer === 'Player 1') {
                cellEl[index].classList.add('player1-disc')
            } else {
                cellEl[index].classList.add('player2-disc')
            }

            moveCount++
            checkWinner()
            checkTie()

            if (gameOver === false) {
                switchPlayer()
            }
            break
        }
    }
}

// check winner function 
function checkWinner() {
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 7; column++) {

            let index = row * 7 + column

            if (board[index] === currentPlayer) {

                // highlight the winning cells 
                let winningCells = []

                // Horizontal
                if (column < 4 &&
                    board[index + 1] === currentPlayer &&
                    board[index + 2] === currentPlayer &&
                    board[index + 3] === currentPlayer) {

                    winningCells = [index, index + 1, index + 2, index + 3]
                }

                // Vertical  
                else if

                    (row < 3 &&
                    board[index + 7] === currentPlayer &&
                    board[index + 14] === currentPlayer &&
                    board[index + 21] === currentPlayer
                ) {
                    winningCells = [index, index + 7, index + 14, index + 21]
                }

                // Diagonal right 
                else if

                    (row < 3 && column < 4 &&
                    board[index + 8] === currentPlayer &&
                    board[index + 16] === currentPlayer &&
                    board[index + 24] === currentPlayer
                ) {
                    winningCells = [index, index + 8, index + 16, index + 24]
                }

                // Diagonal left 
                else if
                    (row < 3 && column > 2 &&
                    board[index + 6] === currentPlayer &&
                    board[index + 12] === currentPlayer &&
                    board[index + 18] === currentPlayer
                ) {
                    winningCells = [index, index + 6, index + 12, index + 18]
                }

                if (winningCells.length > 0) {
                    finishGame(winningCells)
                    return
                }
            }

        }
    }
}


// finish the game
function finishGame(winningCells) {

    const cellEl = document.querySelectorAll('.cell')

    // Highlight the winning discs
    for (let i = 0; i < winningCells.length; i++) {
        cellEl[winningCells[i]].classList.add('winning-disc')
    }
    // if there is a winner then : 

    gameOver = true
    turnEl.textContent = `${getPlayerName()} wins!`
    addScore()
    stopTimer()
    winnerNameEl.textContent = getPlayerName()
    winnerTimeEl.textContent = `Game completed in ${timerEl.textContent}`

    setTimeout (() => {
         winnerModalEl.showModal() }, 1800)
}

// check for tie 
function checkTie() {
    if (moveCount === 42 && gameOver === false) {
        gameOver = true
        turnEl.textContent = 'It is a tie! '
    }
}


//  reset the game 
function resetGame() {
    board = Array(42).fill(null)

    const cellEl = document.querySelectorAll('.cell')

    for (let i = 0; i < cellEl.length; i++) {
        cellEl[i].classList.remove('player1-disc')
        cellEl[i].classList.remove('player2-disc')
        // remove the highlights 
        cellEl[i].classList.remove('winning-disc')
    }

    currentPlayer = 'Player 1'
    moveCount = 0
    gameOver = false

    winnerModalEl.close()
    turnEl.textContent = `${getPlayerName()}'s turn`
    startTimer()
}

function addScore() {
    if (currentPlayer === 'Player 1') {
        player1Score++
        player1scoreEl.textContent = player1Score
    }

    if (currentPlayer == 'Player 2') {
        player2Score++
        player2scoreEl.textContent = player2Score
    }
}

function getPlayerName() {
    if (currentPlayer === 'Player 1') {
        return player1Name
    } else {
        return player2Name
    }
}

//timer 
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return `Time: ${minutes}:${seconds}`
}

function startTimer() {
    clearInterval(timerInterval)
    startTime = Date.now()
    timerEl.textContent = 'Time: 00:00'

    timerInterval = setInterval(() => {
        timerEl.textContent = formatTime(Date.now() - startTime)
    }, 1000)

}

function stopTimer() {
    clearInterval(timerInterval)
}

// calling the function 
createBoard()

/*----------------------------- Event Listeners -----------------------------*/

openInstructionsButtonEls.forEach((button) => {
    button.addEventListener('click', () => {
        instructionsModalEl.showModal()
    })
})

closeInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.close()
})

startButtonEl.addEventListener('click', () => {

    player1Name = player1NameInputEl.value.trim() || 'Player 1'
    player2Name = player2NameInputEl.value.trim() || 'Player 2'

    player1ScoreNameEl.textContent = player1Name
    player2ScoreNameEl.textContent = player2Name

    resetGame()

    homePageEl.hidden = true
    gamePageEl.hidden = false
})

backButtonEl.addEventListener('click', () => {
    stopTimer()
    homePageEl.hidden = false
    gamePageEl.hidden = true
})

resetButton.addEventListener('click', () => {
    player1Score = 0
    player2Score = 0
    player1scoreEl.textContent = 0
    player2scoreEl.textContent = 0
    resetGame()
})

playAgainGameButtonEl.addEventListener('click', resetGame)
playAgainButtonEl.addEventListener('click', resetGame)

goHomeButtonEl.addEventListener('click', () => {
    winnerModalEl.close()
    backButtonEl.click()
})

resetGameButtonEl.addEventListener('click', () => {
    resetButton.click()
})