const setup = () => {

    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let txtInput = document.getElementById("txtInput").value;
    let counter = 0;
    txtInput = txtInput.toLowerCase();
    let index = txtInput.indexOf("an");
    while(index !== -1){
        counter++;
        index = txtInput.indexOf("an", index + 1);
    }
    console.log(counter);
    let pElement=document.getElementById("resultaat");
    pElement.innerText= "Resultaat: " + counter;
}
window.addEventListener("load", setup);