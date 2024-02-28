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
	rood.innerHTML = "Rood: "+value;
	groen.innerHTML = "Groen: "+value2;
	blauw.innerHTML = "Blauw: "+value3;

	colorDemos[0].style.backgroundColor=`rgb(${value}, ${value2}, ${value3})`;
}

// dit is de eerste regel code die uitgevoerd wordt,
// de bovenstaande functie declaraties introduceren
// enkel de functies en voeren ze niet uit natuurlijk.
//
// Onderstaande zorgt ervoor dat de setup functie wordt
// uitgevoerd zodra de DOM-tree klaar is.
window.addEventListener("load", setup);