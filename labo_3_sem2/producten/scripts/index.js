const setup = () => {
    let btnBerekenen=document.getElementById("berekenen");
    btnBerekenen.addEventListener("click", berekenen);
}
const berekenen = () => {
    let prijs = document.getElementsByClassName('prijs');
    let aantal = document.getElementsByClassName('aantal');
    let btw = document.getElementsByClassName('btw');
    let subtotaal = document.getElementsByClassName('subtotaal');
    let totaal=document.getElementById("totaal");
    let totaalberekening = 0;
    let prijzen = [];
    let btws = [];
    for(let i = 0; i < prijs.length; i++){
        prijzen[i] = parseInt(prijs[i].textContent, 10);
        btws[i] = parseInt(btw[i].textContent, 10);

        let tussenresultaat1 = (prijzen[i]*aantal[i].value)/100;
        let tussenresultaat2 = tussenresultaat1 * btws[i];
        let resultaat1 = (prijzen[i]*aantal[i].value) + tussenresultaat2;
        subtotaal[i].innerText = resultaat1 + " EUR";
        totaalberekening += resultaat1;

    }

    let totaalberekening2 = totaalberekening.toFixed(2);
    totaal.innerText = totaalberekening2 + " EUR";
}
window.addEventListener("load", setup);