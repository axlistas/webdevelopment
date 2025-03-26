
let global = {
    highscores: [],
    current_question: null,
    score: 0,
    vragen: [
        {
            question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
            answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
            correct: "Cloud Strife",
            selected: ""
        },
        {
            question: "Welke wereld wordt verkend in Final Fantasy XV?",
            answers: ["Gaia", "Eos", "Spira", "Cocoon"],
            correct: "Eos",
            selected: ""
        },
        {
            question: "Wie is de antagonist in Final Fantasy VIII?",
            answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
            correct: "Ultimecia",
            selected: ""
        },
        {
            question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
            answers: ["Ja", "Nee"],
            correct: "Ja",
            selected: ""
        },
        {
            question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
            answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
            correct: "Midgar",
            selected: ""
        },
        {
            question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
            answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
            correct: "Ifrit",
            selected: ""
        },
        {
            question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
            answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
            correct: "Ragnarok",
            selected: ""
        },
        {
            question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
            answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
            correct: "Luchtschipkapitein",
            selected: ""
        },
        {
            question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
            answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
            correct: "Ze gebruiken de aanval 1000 Needles",
            selected: ""
        },
        {
            question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
            answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
            correct: "Malboro",
            selected: ""
        }
    ]
};
const setup = () => {
    let start = document.getElementById("start");
    start.addEventListener("click", startspel);
}
const startspel = () => {

    let start = document.getElementById("start");
    let quiz = document.getElementById("quiz");
    start.classList.add("d-none");
    quiz.classList.remove("d-none");
    let started = document.getElementById("started");
    started.innerText = initializeTime();
    global.vragen = shuffleArray(global.vragen);
    initializeQuestions();
    displayQuestion(0);
    hideScoreAndReset();
    let saveButton = document.getElementsByClassName("btn-success")[0];
    saveButton.addEventListener("click", saveQuestion);
    document.getElementById("submit").addEventListener("click", indienen);
}
const initializeTime = () => {
    let currentDate = new Date();
    let tijd = currentDate.getDay() + " " + currentDate.getMonth() + " om " + currentDate.getHours()+":"+currentDate.getMinutes();
    console.log(tijd);
    return tijd;
}

const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
}

const initializeQuestions = () => {
    let vragenLijst = document.getElementById("questions");
    let getal = vragenLijst.children.length;
    for(let p = 0; p < getal; p++){
        console.log(p);
        vragenLijst.removeChild(vragenLijst.firstElementChild);
    }
    for(let i = 0; i < global.vragen.length; i++){
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        let nummer = i+1;
        li.innerText = "Vraag "+ nummer;
        vragenLijst.appendChild(li);
        li.setAttribute("nrVraag", i.toString());
        li.addEventListener("click", selectSideBarQuestion);
    }
}
const displayQuestion = (index) => {
    let lijstVraag = document.getElementById("questions").children;

    console.log(lijstVraag)
    for(let i = 0; i < lijstVraag.length; i++){
        lijstVraag[i].classList.remove("active");
    }
    let vraagHeader = document.getElementsByClassName("card-header")[0];
    let vraagGetal = index + 1;
    vraagHeader.innerText = "Vraag #"+vraagGetal;
    let vraagTitle = document.getElementsByClassName("card-title")[0];
    vraagTitle.innerText = global.vragen[index].question;
    global.current_question = index;
    lijstVraag[index].classList.add("active");

    let lijst =  document.getElementById("answers");
    let getal = lijst.children.length;
    for(let p = 0; p < getal; p++){
        console.log(p);
        lijst.removeChild(lijst.firstElementChild);
    }

    let lijstVragen = global.vragen[index].answers;
    lijstVragen = shuffleArray(lijstVragen);
    for(let f = 0; f < lijstVragen.length; f++){
        let li = document.createElement("li");
        li.innerText = lijstVragen[f];
        li.classList.add('list-group-item')
        li.addEventListener("click", selectQuestion);
        lijst.appendChild(li);

    }

}

const hideScoreAndReset= () => {
    let parentNode = document.getElementById("score").parentNode.parentNode;
    parentNode.classList.add("d-none");
}

const selectQuestion = (event) => {
    let lijst =  document.getElementById("answers").children;
    console.log(lijst.length);
    for(let i = 0; i < lijst.length; i++){
        lijst[i].classList.remove("bg-info");
    }
    let aangeduideVraag = event.target;
    aangeduideVraag.classList.add("bg-info");
    global.vragen[global.current_question].selected = event.target.innerText;
}

const saveQuestion = () => {
    console.log("success");
    if(global.vragen[global.current_question].correct === global.vragen[global.current_question].selected){
        console.log("goed")
        document.getElementById("questions").children[global.current_question].classList.add("bg-success");
        global.score++;
        if(global.current_question+1 < global.vragen.length){
            displayQuestion(global.current_question+1);
        }

    }
    else{
        console.log("bad")
        document.getElementById("questions").children[global.current_question].classList.add("bg-danger")
        if(global.current_question+1 < global.vragen.length){
            displayQuestion(global.current_question+1);
        }
    }
}
const selectSideBarQuestion = (event) => {
    if(event.target.classList.contains("bg-danger") || event.target.classList.contains("bg-success")){
    }
    else{
        console.log("nog niet ingevuld")
        displayQuestion(event.target.getAttribute("nrVraag"));
    }

}

const indienen = () => {
    let quiz = document.getElementById("quiz");
    quiz.classList.add("d-none")
    let herstartQuiz = document.getElementById("score").parentNode.parentNode;
    herstartQuiz.classList.remove("d-none");
    let score = document.getElementById("score");
    score.innerText = "Je hebt "+ global.score + " op" + global.vragen.length;
    let herstartSpel = document.getElementById("restart");
    herstartSpel.addEventListener("click", startspel);
}
const compare = (a, b)  => {
    if (a.score < b.score) {
        return -1;
    } else if (a.score > b.score) {
        return 1;
    }
    // a must be equal to b
    return 0;
}


window.addEventListener("load", setup);