const setup = () => {
    inladen()
}
const inladen = () => {
    let stop = false;
    let lijst = document.getElementById('gemeenten');
    let gemeenten = [];
    while (stop === false){
        let input = window.prompt("Geef een gemeente op", "onbekend");
        if (input === 'stop'){
            stop = true;
        }
        else{
           gemeenten.push(input);
        }
    }
    gemeenten = gemeenten.sort();
    console.log(gemeenten);
    for (let i = 0; i < gemeenten.length; i++){
        let input = gemeenten[i];
        lijst.innerHTML += `<option value="${input}">${input}</option>`;
    }

}
window.addEventListener("load", setup);