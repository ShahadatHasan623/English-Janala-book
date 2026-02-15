// button level lession api 
const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all' //button level get api
    fetch(url)
        .then(responsive => responsive.json()) // into convert object
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

// {
//     "id": 1,
//     "level": 3,
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট"
// }

const displayWord = (word) => {

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

    if (word.length == 0) {
        wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-2">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="hind-siliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="hind-siliguri text-4xl font-bold">নেক্সট Lesson এ যান</h1>
        </div>
        `
    }
    word.forEach(wordL => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
           <div class="bg-gray-50 py-10 px-10 text-center space-y-1 shadow-lg shadow-gray-400 rounded-xl">
            <h1 class="text-3xl font-bold">${wordL.word ? wordL.word : "কোনো শব্দ পাওয়া যায় নি"}</h1>
            <p>${wordL.word} /${wordL.pronunciation}</p>
            <h2 class="text-xl font-semibold hind-siliguri">"${wordL.meaning ? wordL.meaning : "অর্থ পাওয়া যায় নি"} / ${wordL.pronunciation ? wordL.pronunciation : "pronunciation পাওয়া যায় নি"}"</h2>
            <div class="flex justify-between items-center mt-5">
                <button class="btn bg-[#37495710]"><i class="fa-solid fa-circle-info fa-lg"></i></button>
                <button class="btn bg-[#37495710]"><i class="fa-solid fa-volume-high z-5 fa-lg"></i></button>
            </div>
        </div>
        `
        wordContainer.append(cardDiv)
    });
}

// lession button show 
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

