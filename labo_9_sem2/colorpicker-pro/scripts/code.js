let global = {
	kleurtjes: [], // aantal figuren
};
const setup = () => {

	let sliders = document.getElementsByClassName("slider");

	// we moeten zowel op het input als het change event reageren,
	// zie http://stackoverflow.com/questions/18544890
	sliders[0].addEventListener("change", update);
	sliders[0].addEventListener("input", update);
	sliders[1].addEventListener("change", update);
	sliders[1].addEventListener("input", update);
	sliders[2].addEventListener("change", update);
	sliders[2].addEventListener("input", update);
	initializeSliders();
	update();
	let btnBewerk = document.getElementById("btnBewerk");
	btnBewerk.addEventListener("click", save);
	initializeStart(localStorage.getItem("kleurtjes"));

}

const update = () => {
	let sliders = document.getElementsByClassName("slider");
	let value=sliders[0].value;
	let value2=sliders[1].value;
	let value3=sliders[2].value;
	console.log("de waarde van de slider is momenteel : "+value+ " "+value2+ " " + value3);
	let colorDemos=document.getElementsByClassName("colorDemo");
	let rood = document.getElementById("rood");
	let groen = document.getElementById("groen");
	let blauw = document.getElementById("blauw");
	rood.innerHTML = "Red: "+value;
	groen.innerHTML = "Green: "+value2;
	blauw.innerHTML = "Blue: "+value3;

	colorDemos[0].style.backgroundColor=`rgb(${value}, ${value2}, ${value3})`;

	let kleuren = [];
	kleuren.push(value);
	kleuren.push(value2);
	kleuren.push(value3);
	let string = JSON.stringify(kleuren);
	localStorage.setItem("sliders", string);
	return kleuren;
}
const saveToStorage = () => {
	global.kleurtjes = [];
	let divchilds = document.getElementsByClassName('saveKleur');
	for(let i = 0; i < divchilds.length; i++){
		let kleur1 = divchilds[i].getAttribute("data-red");
		let kleur2 = divchilds[i].getAttribute("data-green");
		let kleur3 = divchilds[i].getAttribute("data-blue");
		let kleuren = [];
		kleuren.push(kleur1);
		kleuren.push(kleur2);
		kleuren.push(kleur3);
		global.kleurtjes.push(kleuren);

	}
	let string = JSON.stringify(global.kleurtjes);
	localStorage.setItem("kleurtjes", string);
}
const initializeSliders = () => {
	if(localStorage.getItem("sliders") !== null){
		let kleuren = JSON.parse(localStorage.getItem("sliders"));
		let rood = document.getElementById("rood");
		let groen = document.getElementById("groen");
		let blauw = document.getElementById("blauw");
		rood.innerHTML = "Red: "+kleuren[0];
		groen.innerHTML = "Green: "+kleuren[1];
		blauw.innerHTML = "Blue: "+kleuren[2];

		let sliders = document.getElementsByClassName("slider");
		sliders[0].value = kleuren[0];
		sliders[1].value = kleuren[1];
		sliders[2].value = kleuren[2];
	}
}
const initializeStart = (start) =>{
let arrayToPush = JSON.parse(start);
if(arrayToPush !== null){
    for(let i = 0; i < arrayToPush.length; i++){

        let div = document.querySelector('#save');
        let para = document.createElement("div");
        para.style.backgroundColor=`rgb(${arrayToPush[i][0]}, ${arrayToPush[i][1]}, ${arrayToPush[i][2]})`;
        para.classList.add('saveKleur')
		para.setAttribute("data-red", arrayToPush[i][0])
		para.setAttribute("data-green", arrayToPush[i][1])
		para.setAttribute("data-blue", arrayToPush[i][2])
        div.appendChild(para);
        let cross = document.createElement("input")
        cross.type = "button";
        cross.value = "X";
        cross.addEventListener("click", () => {
            remove(para);
            event.stopPropagation();
            event.preventDefault();
        });
        para.addEventListener("click", () => {
            clickKader(para);
        });
        para.appendChild(cross);
    }
    let string = localStorage.getItem("kleurtjes");
    global.kleurtjes = JSON.parse(string);
}

}
const save = () => {
let kleuren = update();

let div = document.querySelector('#save');
let para = document.createElement("div");
para.style.backgroundColor=`rgb(${kleuren[0]}, ${kleuren[1]}, ${kleuren[2]})`;
para.classList.add('saveKleur')
	para.setAttribute("data-red", kleuren[0])
	para.setAttribute("data-green", kleuren[1])
	para.setAttribute("data-blue", kleuren[2])
div.appendChild(para);
let cross = document.createElement("input")
cross.type = "button";
cross.value = "X";
cross.addEventListener("click", () => {
    remove(para);
    event.stopPropagation();
    event.preventDefault();
});
para.addEventListener("click", () => {
    clickKader(para);
});
para.appendChild(cross);
saveToStorage();
}
const remove = (para) => {
let div = document.querySelector('#save');
    div.removeChild(para);
	saveToStorage();

}
const clickKader = (kleurenMegegeven) => {
let kleuren = kleurenMegegeven;
let sliders = document.getElementsByClassName("slider");
let value= kleuren.getAttribute("data-red");
let value2=kleuren.getAttribute("data-green");
let value3=kleuren.getAttribute("data-blue");
sliders[0].value = kleuren.getAttribute("data-red");
sliders[1].value = kleuren.getAttribute("data-green");
sliders[2].value = kleuren.getAttribute("data-blue");
let colorDemos=document.getElementsByClassName("colorDemo");
let rood = document.getElementById("rood");
let groen = document.getElementById("groen");
let blauw = document.getElementById("blauw");
rood.innerHTML = "Red: "+value;
groen.innerHTML = "Green: "+value2;
blauw.innerHTML = "Blue: "+value3;

colorDemos[0].style.backgroundColor=`rgb(${value}, ${value2}, ${value3})`;
	let colors = [];
	colors.push(value);
	colors.push(value2);
	colors.push(value3);
	let string = JSON.stringify(colors);
	localStorage.setItem("sliders", string);
}
window.addEventListener("load", setup);