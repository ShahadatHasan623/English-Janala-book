const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(responsive => responsive.json())
        .then((json) => {
            displayLession(json.data)
        })
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then((json) => displayWord(json.data))
}

const displayWord = (word) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''
    word.forEach(wordL => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `<h1>${wordL.word}</h1>
        `
        wordContainer.append(cardDiv)
    });
}
const displayLession = (level) => {
    const lessionContainer = document.getElementById('level-container')
    lessionContainer.innerHTML = ''
    for (let less of level) {
        const divBtn = document.createElement('div')
        divBtn.innerHTML = `
         
         <button onclick=loadLevelWord(${less.level_no}) class="btn btn-outline btn-primary list-none">
             <i class="fa-solid fa-book-open"></i> Lession - ${less.level_no}
         </button>
        `
        lessionContainer.append(divBtn)
    }
}
loadLesson()

