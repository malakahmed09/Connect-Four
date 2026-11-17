// variable 


// chached 
const instructionsModalEl = document.querySelector ('#instructions')
const openInstructionsButtonEl = document.querySelector('#open-instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')

const startButtonEl = document.querySelector('#start')
const homePageEl = document.querySelector('.homePage')
const gamePageEl = document.querySelector('#gamePage')

// functions 


// event listener 
openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', ()=>{
    instructionsModalEl.close()
})

startButtonEl.addEventListener('click', ()=> {
    homePageEl.hidden = true;
    gamePageEl.hidden = false; 
})

