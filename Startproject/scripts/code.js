let global = {
    naam: '', // speler naam
    woorden: ["vives","stoel","tafel"],
    gekozenWoord: "",
    counter: 0,
    aantalTry: 0,
    highscores: [],
};
const setup = () => {
    let btnNiewSpel = document.getElementById("nieuw");
    btnNiewSpel.addEventListener("click", startSpel);
    let input = document.getElementById("gok");
    let btnGO = document.getElementById("go");
    input.disabled = "disabled";
    btnGO.disabled = "disabled";
    btnGO.addEventListener("click", checkInput);
    if(localStorage.getItem("highscores") !== null){
        initializeHighscores();
    }
    let clear = document.getElementById("clear");
    clear.addEventListener("click", clearHigh);
}

const startSpel = () => {
    let gokken = document.getElementById("gokken");
    if(gokken.childNodes !== null){
        while (gokken.firstChild) {
            gokken.removeChild(gokken.lastChild);
        }
    }
    let btnNiewSpel = document.getElementById("nieuw");
    let resp = window.prompt("Voer je naam in")
    global.aantalTry = 0;
    global.naam = resp;
    console.log(resp)
    if(resp === null){
        return;
    }
    btnNiewSpel.classList.add("hidden");
    let input = document.getElementById("gok");
    input.value = "";
    let btnGo = document.getElementById("go");
    input.disabled = "";
    btnGo.disabled = "";
    global.gekozenWoord = global.woorden[Math.floor(Math.random()*global.woorden.length)];
    console.log(global.gekozenWoord);
}

const checkInput = () => {
    global.counter = 0;
    let input = document.getElementById("gok");
    let gokken = document.getElementById("gokken");
    if(input.value.length !== 5){
        return;
    }
    let outerBox = document.createElement('div');
    for(let i = 0; i < 5; i++){
        if(global.gekozenWoord.charAt(i) === input.value.charAt(i)){
            let innerBox = document.createElement('div');
            innerBox.classList.add("juist");
            innerBox.innerText = input.value.charAt(i);
            outerBox.appendChild(innerBox);
            global.counter++;
            innerBox.addEventListener("click", infoTab);

        }
        else if(global.gekozenWoord.indexOf(input.value.charAt(i)) >= 0){
            let innerBox = document.createElement('div');
            innerBox.classList.add("bevat");
            innerBox.innerText = input.value.charAt(i);
            outerBox.appendChild(innerBox);
            innerBox.addEventListener("click", infoTab);
        }
        else{
            let innerBox = document.createElement('div');
            innerBox.classList.add("fout");
            innerBox.innerText = input.value.charAt(i);
            outerBox.appendChild(innerBox);
            innerBox.addEventListener("click", infoTab);
        }
    }
    gokken.appendChild(outerBox);
    global.aantalTry++;
    if(global.counter === 5){
        let btnNiewSpel = document.getElementById("nieuw");
        btnNiewSpel.classList.remove("hidden");
        addHighScore();
    }

}

const infoTab = (event) => {
    if(global.timerId !== null){
        clearTimeout(global.timerId);
    }
    let helpBanner = document.querySelector('p');
    helpBanner.classList.remove('hidden');
    global.timerId = setTimeout(hideInfo, 2500);
    if(event.target.classList.contains("juist")){
        helpBanner.innerText = "Deze letter is juist en staat op de juiste plek";
    }
    else if(event.target.classList.contains("bevat")){
        helpBanner.innerText = "Het woord bevat deze letter maar staat op de fout plek";
    }
    else{
        helpBanner.innerText = "Deze letter is fout en het woord bevat dit ook niet";
    }
}

const hideInfo = () =>{
    let helpBanner = document.querySelector('p');
    helpBanner.classList.add("hidden");
}

const addHighScore = ()=> {
    let highscore ={
        naam: global.naam,
        score: global.aantalTry
    }
    global.highscores.push(highscore);
    localStorage.setItem("highscores", JSON.stringify(global.highscores));
    initializeHighscores();
}

const initializeHighscores = () => {
    let opgeslagenItems = JSON.parse(localStorage.getItem("highscores"));
    global.highscores = opgeslagenItems;
    opgeslagenItems.sort(compare);
    for(let i = 0; i < opgeslagenItems.length; i++){
        console.log(opgeslagenItems[i].naam + " " + opgeslagenItems[i].score);
    }

    let highscores = document.getElementById("highscores");
    let paragraphs = highscores.getElementsByTagName("h5");
    for (let i = paragraphs.length - 1; i >= 0; i--) {
        let paragraph = paragraphs[i];
        paragraph.parentNode.removeChild(paragraph);
    }

    for(let i = 0; i < opgeslagenItems.length; i++){
        let h5 = document.createElement('h5');
        h5.innerText = "Naam: "+ opgeslagenItems[i].naam + " Score: " + opgeslagenItems[i].score;
        highscores.appendChild(h5);
    }
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
const clearHigh = () => {
    localStorage.removeItem("highscores");
    global.highscores = [];
    let highscores = document.getElementById("highscores");
    let paragraphs = highscores.getElementsByTagName("h5");
    for (let i = paragraphs.length - 1; i >= 0; i--) {
        let paragraph = paragraphs[i];
        paragraph.parentNode.removeChild(paragraph);
    }
}
window.addEventListener("load", setup);