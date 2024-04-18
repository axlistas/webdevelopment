const setup = () => {
    let currentDate = new Date();
    let birthDate = new Date('Nov 14, 2005');
    let amountOfDays = currentDate - birthDate;

    console.log(msToDays(amountOfDays));
}
const msToDays = (v) => {
    return Math.floor(v / 8.64e7);
}
window.addEventListener("load", setup);