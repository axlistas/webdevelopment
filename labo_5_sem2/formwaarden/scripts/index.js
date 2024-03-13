const setup = () => {
    let klikEnVoerUit = document.getElementById("verzenden");
    klikEnVoerUit.addEventListener("click", uitvoeren);
}
const uitvoeren =() => {
    let roken = document.getElementById('roker').checked;
    let nederlands = document.getElementById('nederlands').checked;
    let frans = document.getElementById('frans').checked;
    let engels = document.getElementById('engels').checked;
    let buurland = document.getElementById('buurland').value;
    let bestelling = document.getElementById('bestelling').options;
    if (roken === true){
        console.log('Rookt')
    }
    else{
        console.log('Is geen roker')
    }
    if(nederlands === true){console.log('Moedertaal is nl')}
    if(frans === true){console.log('Moedertaal is fr')}
    if(engels === true){console.log('Moedertaal is en')}
    console.log(`Favoriete buurland is ${buurland}`);
    let bestellingZin = "bestelling bestaat uit";
    for (let i = 0; i <bestelling.length; i++){
        if(bestelling[i].selected === true){
            bestellingZin += " " + bestelling[i].value;
        }
    }
    console.log(bestellingZin);
}
window.addEventListener("load", setup);