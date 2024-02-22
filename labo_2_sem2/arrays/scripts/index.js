const setup = () => {
    let familieleden = ['Luka','Ineke','Ernie','William','Noella'];
    console.log(familieleden);
    console.log(familieleden.length);
    console.log(familieleden[2]);
    console.log(familieleden[4]);
    function VoegNaamToe(array, nieuweNaam) {
        array.push(nieuweNaam);
    }
    let nieuweNaam = prompt("Voer een nieuwe naam in:");
    VoegNaamToe(familieleden, nieuweNaam);

    console.log("Resultaat array:", familieleden);
    let namenString = familieleden.join(', ');
    console.log("Namen als string:", namenString);
}
window.addEventListener("load", setup);


