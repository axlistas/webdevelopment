const setup = () => {
    document.getElementById("kip").onchange = lijst;
    document.getElementById("letter").onchange = tekst;
}
const lijst = () => {
    let image = document.getElementById('img');
    let text = document.getElementById("kip").value;

    if(text === "Met een ei"){
        image.classList.remove("hidden");
        image.classList.remove("with-egg");
        image.classList.add("with-egg");
        let text = document.getElementById("kip").value;
        text = text.toLowerCase();
        let note = document.getElementById("note");
        note.innerText = "Hierboven, een kip " + text;

    }
    else if(text === "Zonder een ei"){
        image.classList.remove("with-egg");
        image.classList.remove("hidden");
        let text = document.getElementById("kip").value;
        text = text.toLowerCase();
        let note = document.getElementById("note");
        note.innerText = "Hierboven, een kip " + text;
    }
    else {
        image.classList.remove("hidden");
        image.classList.remove("with-egg");
        image.classList.add("hidden");
        let note = document.getElementById("note");
        note.innerText = "";
    }

}

const tekst = () => {
    let note = document.getElementById("note");
    note = note.innerText;
    let note2 = note;
    let letter = document.getElementById("letter").value;
    let counter = 0;
    note = note.toLowerCase();
    let index = note.indexOf(letter);
    while(index !== -1){
        counter++;
        index = note.indexOf(letter, index + 1);
    }
    console.log(counter);
    note = note2
    if(note.innerText !== ""){
        note.innerText += `\n Letter "` + letter + `" komt ` + counter + " keer voor in bovenstaande zin";
    }
}

window.addEventListener("load", setup);