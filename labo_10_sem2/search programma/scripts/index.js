
let global = {
    boxes: [], // aantal boxes
};
const setup = () => {
    let btnGO = document.getElementById("btnGO");
    btnGO.addEventListener("click", search);
    initializeStart(localStorage.getItem("Boxes"));
}
const search = () => {
    let searchField = document.getElementById("txtInput")
    if(searchField.value.charAt(0) !==  "/"){
        alert("Invalid command");
    }
    else{
        if (searchField.value.charAt(1) ===  "g" && searchField.value.charAt(2) === " "){
            console.log("success google")
            let copySearch = searchField.value;
            copySearch = copySearch.substring(3)
            let text = copySearch;
            copySearch = copySearch.split(" ").join("+");
            let link = `https://www.google.com/search?q=${copySearch}`
            addbox(link, text);
            window.open(link);
            saveToStorage();
        }
        else if(searchField.value.charAt(1) ===  "y" && searchField.value.charAt(2) === " "){
            console.log("success yt")
            let copySearch = searchField.value;
            copySearch = copySearch.substring(3);
            let text = copySearch;
            copySearch = copySearch.split(" ").join("+");
            let link = `https://www.youtube.com/results?search_query=${copySearch}`;
            addbox(link, text);
            window.open(link);
            saveToStorage();
        }
        else if (searchField.value.charAt(1) ===  "t" && searchField.value.charAt(2) === " "){
            console.log("success twitter")
            let copySearch = searchField.value;
            copySearch = copySearch.substring(3)
            let text = copySearch;
            copySearch = copySearch.split(" ").join("%20");
            let link = `https://twitter.com/hashtag/${copySearch}`;
            addbox(link, text);
            window.open(link);
            saveToStorage();
        }
        else if (searchField.value.charAt(1) ===  "i" && searchField.value.charAt(2) === " "){
            console.log("success insta")
            let copySearch = searchField.value;
            copySearch = copySearch.substring(3);
            let text = copySearch;
            copySearch = copySearch.split(" ").join("");
            // instagram werkt niet met spaties
            let link = `https://www.instagram.com/explore/tags/${copySearch}`;
            addbox(link, text);
            window.open(link);
            saveToStorage();
        }
        else{
            alert("Unknown command prefix");
        }
    }
}

const addbox = (link, text) => {
    //aanmaken van de box
    let cardsBox = document.getElementById('cardsBox')
    let container = document.createElement("div");
    container.classList.add('card');
    container.classList.add('kaart');
    container.classList.add('text-white')
    container.style.width = "18rem";
    let containerbody = document.createElement("div");
    containerbody.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    let cardLink = document.createElement("a");
    cardLink.classList.add("btn");


    //invullen van waarden
    cardLink.innerText = "GO!"
    cardLink.href = link;
    cardLink.target = "_blank"
    if(link.includes("google")){
        cardTitle.innerText = "Google";
        cardText.innerText = text;
        container.classList.add("bg-primary");
        cardLink.classList.add("btn-info");
    }
    else if (link.includes("youtube")){
        cardTitle.innerText = "Youtube";
        cardText.innerText = text;
        container.classList.add("bg-danger");
        cardLink.classList.add("btn-primary");
    }
    else if (link.includes("twitter")){
        cardTitle.innerText = "Twitter";
        cardText.innerText = text;
        container.classList.add("bg-dark");
        cardLink.classList.add("btn-secondary");
    }
    else if (link.includes("instagram")){
        cardTitle.innerText = "Instagram";
        cardText.innerText = text;
        container.classList.add("bg-warning");
        cardLink.classList.add("btn-secondary");
    }
    //toevoegen aan de pagina
    container.appendChild(containerbody);
    containerbody.appendChild(cardTitle);
    containerbody.appendChild(cardText);
    containerbody.appendChild(cardLink);
    cardsBox.appendChild(container);


}

const saveToStorage = () => {
    global.boxes = [];
    let divchilds = document.getElementsByClassName('kaart');
    for(let i = 0; i < divchilds.length; i++){
        let link = divchilds[i].querySelector("a").getAttribute("href");
        let tekst = divchilds[i].querySelector("p").innerText;
        let info = [];
        info.push(tekst);
        info.push(link);
        global.boxes.push(info);

    }
    let string = JSON.stringify(global.boxes);
    localStorage.setItem("Boxes", string);
}

const initializeStart = (start) =>{
    let arrayToPush = JSON.parse(start);
    if(arrayToPush !== null){
        for(let i = 0; i < arrayToPush.length; i++) {
            addbox(arrayToPush[i][1], arrayToPush[i][0]);
        }
    }
}
window.addEventListener("load", setup);