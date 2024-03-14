const setup = () => {
	let btnValideer=document.getElementById("btnValideer");
	btnValideer.addEventListener("click", valideer);
};

const valideer = () => {

	let getal1 = valideerVoornaam();
	let getal2 = valideerAchternaam();
	let getal3 = valideerDatum();
	let getal4 = valideerEmail();
	let getal5 = valideerAantalKinderen();
	let controle = getal1 + getal2 + getal3 + getal4 + getal5;
	if(controle === 0){
		window.alert("Proficiat!");
	}
};

const valideerVoornaam = () => {
	let txtVoornaam = document.getElementById("txtVoornaam");
	let errVoornaam = document.getElementById("errVoornaam");
	let voornaam = txtVoornaam.value.trim();
	if (voornaam.length > 30) {
		txtVoornaam.className="invalid"; // invalid class instellen
		errVoornaam.innerHTML = "max. 30 karakters";
	} else {
		txtVoornaam.className=""; // alle classes verwijderen
		errVoornaam.innerHTML = "";
	}
	return 0;
};

const valideerAchternaam = () => {
	let controle = 0;
	let txtAchternaam = document.getElementById("txtAchternaam");
	let errAchternaam = document.getElementById("errAchternaam");
	let achternaam = txtAchternaam.value.trim();
	txtAchternaam.className=""; // alle classes verwijderen
	errAchternaam.innerHTML = "";
	if (achternaam.length === 0){
		txtAchternaam.className="invalid"; // invalid class instellen
		errAchternaam.innerHTML = "Verplicht veld";
		controle++;
	}
	else{
		if (achternaam.length > 50) {
			txtAchternaam.className="invalid"; // invalid class instellen
			errAchternaam.innerHTML = "max. 50 karakters";
			controle++;
		} else {
			txtAchternaam.className=""; // alle classes verwijderen
			errAchternaam.innerHTML = "";
		}
	}
	return controle;
}

const valideerDatum = () => {
	let controle = 0;
	let txtDatum = document.getElementById("txtDatum");
	let errDatum = document.getElementById("errDatum");
	let datum = txtDatum.value.trim();
	txtDatum.className=""; // alle classes verwijderen
	errDatum.innerHTML = "";
	if (datum.length === 0){
		txtDatum.className="invalid";
		errDatum.innerHTML = "Verplicht veld";
		controle++;
	}
	else{
		if (datum.charAt(4) !== "-" || datum.charAt(7) !== "-" || datum.length !== 10){
			txtDatum.className="invalid";
			errDatum.innerHTML = "Formaat is niet jjjj-mm-dd";
			controle++;
		}
		else{
			let getallen = datum.split('');
			let error = false;
			for (let i = 0; i < getallen.length; i++){
				if (!(getallen[i] >= '0' && getallen[i] <= '9' || getallen[i] === '-')){
					error = true
				}
			}
			if (error === true){
				txtDatum.className="invalid";
				errDatum.innerHTML = "Alleen getallen en '-' zijn toegelaten";
				controle++;
			}
		}
	}
	return controle;
}
const valideerEmail = () => {
	let controle = 0;
	let txtEmail = document.getElementById("txtEmail");
	let errEmail = document.getElementById("errEmail");
	let email = txtEmail.value.trim();
	txtEmail.className=""; // alle classes verwijderen
	errEmail.innerHTML = "";
	if (email.length === 0){
		txtEmail.className="invalid"; // invalid class instellen
		errEmail.innerHTML = "Verplicht veld";
		controle++;
	}
	else{
		let letters = email.split('');
		let counter = 0;
		for (let i = 0; i < letters.length; i++){
			if(letters[i] === '@'){
				counter++;
			}
		}
		if(counter !== 1){
			txtEmail.className="invalid"; // invalid class instellen
			errEmail.innerHTML = "Geen geldig email adres";
			controle++;
		}
		else{
			if(email.indexOf('@') < 1 || email.length < 3){
				txtEmail.className="invalid"; // invalid class instellen
				errEmail.innerHTML = "Geen geldig email adres";
				controle++;
			}
			else{
				let index = email.indexOf("@") + 1;
				if (email.charAt(index) === ''){
					txtEmail.className="invalid"; // invalid class instellen
					errEmail.innerHTML = "Geen geldig email adres";
					controle++;
				}
			}
		}
	}
	return controle;
}
const valideerAantalKinderen = () => {
	let controle = 0;
	let txtKinderen = document.getElementById("txtKinderen");
	let errKinderen = document.getElementById("errKinderen");
	let kinderen = txtKinderen.value.trim();
	txtKinderen.className=""; // alle classes verwijderen
	errKinderen.innerHTML = "";
	if(kinderen.length > 2){
		txtKinderen.className="invalid"; // invalid class instellen
		errKinderen.innerHTML = "Te vruchtbaar";
		controle++;
	}
	else{
		let getallen = kinderen.split('');
		let error = false;
		for (let i = 0; i < getallen.length; i++){
			if (!(getallen[i] >= '0' && getallen[i] <= '9')){
				error = true
			}
		}
		if (error === true){
			txtKinderen.className="invalid"; // invalid class instellen
			errKinderen.innerHTML = "Alleen positieve getallen zijn toegelaten";
			controle++;
		}
	}
	return controle;
}
window.addEventListener("load", setup);