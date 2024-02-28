const setup = () => {
    let btnBerekenen=document.getElementById("berekenen");
    btnBerekenen.addEventListener("click", berekenen);
}
const berekenen = () => {
    let prijs1=document.getElementById("prijs1").textContent;
    let prijs2=document.getElementById("prijs2").textContent;
    let prijs3=document.getElementById("prijs3").textContent;
    let aantal1=document.getElementById("aantal1").value;
    let aantal2=document.getElementById("aantal2").value;
    let aantal3=document.getElementById("aantal3").value;
    let btw1=document.getElementById("btw1").textContent;
    let btw2=document.getElementById("btw2").textContent;
    let btw3=document.getElementById("btw3").textContent;
    let subtotaal1=document.getElementById("subtotaal1");
    let subtotaal2=document.getElementById("subtotaal2");
    let subtotaal3=document.getElementById("subtotaal3");
    let totaal=document.getElementById("totaal");
    prijs1 = parseInt(prijs1, 10);
    prijs2 = parseInt(prijs2, 10);
    prijs3 = parseInt(prijs3, 10);

    btw1 = parseInt(btw1, 10);
    btw2 = parseInt(btw2, 10);
    btw3 = parseInt(btw3, 10);

    let tussenresultaat1 = (prijs1*aantal1)/100;
    let tussenresultaat2 = tussenresultaat1 * btw1;
    let resultaat1 = (prijs1*aantal1) + tussenresultaat2;
    subtotaal1.innerText = resultaat1 + " EUR";

    let tussenresultaat3 = (prijs2*aantal2)/100;
    let tussenresultaat4 = tussenresultaat3 * btw2;
    let resultaat2 = (prijs2*aantal2) + tussenresultaat4;
    subtotaal2.innerText = resultaat2 + " EUR";

    let tussenresultaat5 = (prijs3*aantal3)/100;
    let tussenresultaat6 = tussenresultaat5 * btw2;
    let resultaat3 = (prijs3*aantal3) + tussenresultaat6;
    subtotaal3.innerText = resultaat3 + " EUR";

    let totaalberekening = resultaat3 + resultaat2 + resultaat1;
    let totaalberekening2 = totaalberekening.toFixed(2);
    totaal.innerText = totaalberekening2 + " EUR";
}
window.addEventListener("load", setup);