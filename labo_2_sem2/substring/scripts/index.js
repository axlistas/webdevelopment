
const setup = () => { 
	let btnSubstring=document.getElementById("btnSubstring");


	btnSubstring.addEventListener("click", substring);
}
window.addEventListener('load',setup);
const substring = () => {
	let txtOutput = document.getElementById("tekst").value;
	let getal1 = document.getElementById("getal1").value;
	let getal2 = document.getElementById("getal2").value;
	let resultaat = txtOutput.substring(getal1, getal2);
	document.getElementById("result").innerHTML = resultaat;
}




















