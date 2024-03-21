const setup = () => {
    let paragraaf = document.querySelectorAll('p');
    paragraaf[0].textContent  = "Good Job!"
}
window.addEventListener("load", setup);