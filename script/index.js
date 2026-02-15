const createElement = (arr) => {
    const synonyms = arr.map(synms => `<span class="btn">${synms}</span>`
    )
    return synonyms.join(" ")
}

// button level lession api 
const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all' //button level get api
    fetch(url)
        .then(responsive => responsive.json()) // into convert object
        .then((json) => {
            displayLession(json.data)
        })
}
const removeActive = () => {
    const lessonsBtn = document.querySelectorAll(".lesson-btn-active")
    lessonsBtn.forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white")
    })
}
const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then((json) => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("bg-blue-600", "text-white")
            displayWord(json.data)
        })

}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)

}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }
const displayWordDetails = (details) => {

    const wordModal = document.getElementById("modal-container")
    wordModal.innerHTML = ""
    wordModal.innerHTML = ` <div class="space-y-2">
                    <h1 class="text-2xl font-semibold hind-siliguri">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h1>
                    <div>
                        <h2 class="text-2xl font-semibold">Meaning</h2>
                        <p class="text-xl hind-siliguri">${details.meaning}</p>
                        <h3 class="text-2xl font-semibold">Example</h3>
                        <p class="text-xl text-gray-600">${details.sentence}</p>
                    </div>
                    <div>
                        <h1 class="text-2xl font-semibold hind-siliguri">সমার্থক শব্দ গুলো</h1>
                        <div class="flex items-center gap-2 text-lg font-medium text-gray-700">
                            <div>
                               ${createElement(details.synonyms)}
                            </div>
                        </div>
                    </div>
                </div>`
    document.getElementById("word_modal").showModal()
}

// {
//     "id": 1,
//     "level": 3,
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট"
// }

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove("hidden")
        document.getElementById('word-container').classList.add("hidden")
    }
    else {
        document.getElementById('word-container').classList.remove("hidden")
        document.getElementById('spinner').classList.add("hidden")
    }
}

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
        manageSpinner(false)
        return
    }
    word.forEach(wordL => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
           <div class="bg-gray-50 py-10 px-10 text-center space-y-1 shadow-lg shadow-gray-400 rounded-xl">
            <h1 class="text-3xl font-bold">${wordL.word ? wordL.word : "কোনো শব্দ পাওয়া যায় নি"}</h1>
            <p>${wordL.word} /${wordL.pronunciation}</p>
            <h2 class="text-xl font-semibold hind-siliguri">"${wordL.meaning ? wordL.meaning : "অর্থ পাওয়া যায় নি"} / ${wordL.pronunciation ? wordL.pronunciation : "pronunciation পাওয়া যায় নি"}"</h2>
            <div class="flex justify-between items-center mt-5">
                <button onclick="loadWordDetails(${wordL.id})" class="btn bg-[#37495710]"><i class="fa-solid fa-circle-info fa-lg"></i></button>
                <button class="btn bg-[#37495710]"><i class="fa-solid fa-volume-high z-5 fa-lg"></i></button>
            </div>
        </div>
        `
        wordContainer.append(cardDiv)
    });
    manageSpinner(false)
}

// lession button show 
const displayLession = (level) => {
    const lessionContainer = document.getElementById('level-container')
    lessionContainer.innerHTML = ''
    for (let less of level) {
        const divBtn = document.createElement('div')
        divBtn.innerHTML = `
         
         <button id="lesson-btn-${less.level_no}" onclick=loadLevelWord(${less.level_no}) class="btn btn-outline z-10  btn-primary list-none lesson-btn-active">
             <i class="fa-solid fa-book-open"></i> Lession - ${less.level_no}
         </button>
        `
        lessionContainer.append(divBtn)
    }
}
loadLesson()

