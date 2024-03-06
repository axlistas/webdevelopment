const setup = () => {

    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let txtInput = document.getElementById("txtInput").value;
    console.log(maakMetSpaties(txtInput))
}
const maakMetSpaties = (inputTekst) => {
    let input = inputTekst;
    input = input.replaceAll(" ", "");
    let nieuweTekst = "";
    for (let i = 0; i < input.length -1; i++){
        nieuweTekst += input.charAt(i) + " "
    }
    nieuweTekst += input.charAt(input.length-1)
    return nieuweTekst;
}
window.addEventListener("load", setup);