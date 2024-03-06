const setup = () => {

    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let txtInput = document.getElementById("txtInput").value;
    txtInput = txtInput.replaceAll(" ", "");
    let nieuweTekst = "";
    for (let i = 0; i < txtInput.length -1; i++){
        nieuweTekst += txtInput.charAt(i) + " "
    }
    nieuweTekst += txtInput.charAt(txtInput.length-1)
    console.log(nieuweTekst);
}
window.addEventListener("load", setup);