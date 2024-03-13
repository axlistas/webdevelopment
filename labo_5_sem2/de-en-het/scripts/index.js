const setup = () => {

    let btnBewerk = document.getElementById("btnBewerk");
    btnBewerk.addEventListener("click", bewerk);
}
const bewerk = () => {
    let txtInput = document.getElementById("txtInput").value;
    let woorden = txtInput.split(' ');
    for (let i = 0; i < woorden.length; i++) {
        if (woorden[i] === 'de') {
            woorden[i] = 'het';
        } else if (woorden[i] === 'De') {
            woorden[i] = 'Het';
        }
        else if (woorden[i] === 'Het') {
            woorden[i] = 'De';
        }
        else if (woorden[i] === 'het') {
            woorden[i] = 'de';
        }
    }
    let nieuweTekst = woorden.join(' ');
    console.log(nieuweTekst);
}
window.addEventListener("load", setup);