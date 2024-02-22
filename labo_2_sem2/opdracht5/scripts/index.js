const setup = () => {
    let btnaanpassen=document.getElementById("btnaanpassen");
    btnaanpassen.addEventListener("click", aanpassen);

}
const aanpassen = () => {
    let pElement=document.getElementById("txtOutput");
    pElement.innerHTML="Welkom!";
}
window.addEventListener("load", setup);