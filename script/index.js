const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(responsive => responsive.json())
        .then((json) => {
            displayLession(json.data)
        })
}
const displayLession = (level) => {
    const lessionContainer = document.getElementById('level-container')
    lessionContainer.innerHTML = ''
    for (let less of level) {
        const divBtn = document.createElement('div')
        divBtn.innerHTML = `
         
         <button class="btn btn-outline btn-primary list-none">
             <i class="fa-solid fa-book-open"></i> Lession - ${less.level_no}
         </button>
        `
        lessionContainer.append(divBtn)
    }
}
loadLesson()

