let global = {
    IMAGE_COUNT: 5, // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/", // map van de figuren
    IMAGE_PATH_SUFFIX: ".png", // extensie van de figuren
    MOVE_DELAY: 1000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 0, // aantal hits
    timeoutId: 0 // id van de timeout timer, zodat we die kunnen annuleren
};
const setup = () => {
    let start = document.getElementById('start');
    start.addEventListener("click", begin);
};
const begin = () => {
    let start = document.getElementById('start');
    start.style.display = 'none';
    let image0 = document.getElementById('img0');
    image0.addEventListener("click", beweeg);
    global.timeoutId = setInterval(randomImage, global.MOVE_DELAY);
    let maxLeft=600 - image0.offsetWidth;
    let maxHeight=600 - image0.offsetHeight;
    let left=Math.floor(Math.random()*maxLeft);
    let top=Math.floor(Math.random()*maxHeight);
    image0.style.left=left+"px";
    image0.style.top=top+"px";
    randomImage();
}
const beweeg = () => {
    let image0 = document.getElementById('img0');
    let maxLeft=600 - image0.offsetWidth;
    let maxHeight=600 - image0.offsetHeight;
    let left=Math.floor(Math.random()*maxLeft);
    let top=Math.floor(Math.random()*maxHeight);

    console.log(document.getElementById('img0').src);
    if(document.getElementById('img0').src.includes("images/0.png")){
        alert(`Verloren, eindscore: ${global.score}`);
        clearInterval(global.timeoutId);
    }
    else{
        global.score++;
        let text = document.getElementById("text");
        text.innerText = `Aantal hits: ${global.score}`
        randomImage();
        image0.style.left=left+"px";
        image0.style.top=top+"px";
    }
}
const randomImage = () => {
    let image0 = document.getElementById('img0');
    let randomGetal = Math.floor(Math.random()*global.IMAGE_COUNT);
    image0.src = global.IMAGE_PATH_PREFIX+randomGetal+global.IMAGE_PATH_SUFFIX;
}
window.addEventListener("load", setup);


