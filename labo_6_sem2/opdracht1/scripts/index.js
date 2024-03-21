const setup = () => {
    let element = document.querySelector('#abc');
    console.log(element.nodeName);
    console.log(element)
}
window.addEventListener("load", setup);