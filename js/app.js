// variable 


// chached 
const instructionsModalEl = document.querySelector ('#instructions')
const openInstructionsButtonEl = document.querySelector('#open-instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')

// functions 


// event listener 
openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', ()=>{
    instructionsModalEl.close()
})

