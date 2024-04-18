let student={
    voornaam : "Jan",
    familienaam : "Janssens",
    geboorteDatum : new Date("1993-12-31"),
    adres : { // een object
        straat : "Kerkstraat 13",
        postcode : "8500",
        gemeente : "Kortrijk"
    },
    isIngeschreven : true,
    namenVanExen : ["Sofie", "Berta", "Philip", "Albertoooo"], // een array
    aantalAutos : 2
}
const setup = () => {
    let string = JSON.stringify(student)
    console.log(string);
    let student2 = JSON.parse(string);
    console.log(student2.voornaam);

}
window.addEventListener("load", setup);