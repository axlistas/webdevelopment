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
	update();
	let btnBewerk = document.getElementById("btnBewerk");
	btnBewerk.addEventListener("click", save);
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

	return kleuren;
}

const save = () => {
	let kleuren = update();
	let div = document.querySelector('#save');
	let para = document.createElement("div");
	para.style.backgroundColor=`rgb(${kleuren[0]}, ${kleuren[1]}, ${kleuren[2]})`;
	para.classList.add('saveKleur')
	div.appendChild(para);
	let cross = document.createElement("input")
	cross.type = "button";
	cross.value = "X";
	cross.addEventListener("click", () => {
		remove(para);
	});
	para.addEventListener("click", () => {
		clickKader(kleuren);
	});
	para.appendChild(cross);
}
const remove = (para) => {
	let div = document.querySelector('#save');
	div.removeChild(para);
}
const clickKader = (kleurenMegegeven) => {
	let kleuren = kleurenMegegeven;
	let value=kleuren[0];
	let value2=kleuren[1];
	let value3=kleuren[2];
	let colorDemos=document.getElementsByClassName("colorDemo");
	let rood = document.getElementById("rood");
	let groen = document.getElementById("groen");
	let blauw = document.getElementById("blauw");
	rood.innerHTML = "Red: "+value;
	groen.innerHTML = "Green: "+value2;
	blauw.innerHTML = "Blue: "+value3;

	colorDemos[0].style.backgroundColor=`rgb(${value}, ${value2}, ${value3})`;
}
window.addEventListener("load", setup);