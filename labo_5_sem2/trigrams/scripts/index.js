const setup = () => {

    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let txtInput = document.getElementById("txtInput").value;
    txtInput = txtInput.replaceAll(" ", "");
    let getal = 0;
    while (getal < txtInput.length){
        if (txtInput.substring(getal,3+getal).length === 3){
            console.log(txtInput.substring(getal,3+getal))
        }
        getal += 1;
    }
}
window.addEventListener("load", setup);