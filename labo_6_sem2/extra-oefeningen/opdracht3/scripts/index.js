const setup = () => {
    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let para = document.createElement("p");
    let div = document.querySelector('div');
    para = document.createTextNode("This is a new paragraph.");
    div.appendChild(para);
}
window.addEventListener("load", setup);