let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    SELECTED: [],
    COUNTER: 0
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const handleGenerateCards = () => {
    const results = [];

    for(let i = 0; i < global.AANTAL_KAARTEN; i++){
        results.push(`images/kaart${i+1}.jpg`)
        results.push(`images/kaart${i+1}.jpg`)
    }

   return shuffle(results);
}

const handleRenderGrid = () => {
    const gridWidth = global.AANTAL_HORIZONTAAL*150+20;
    const gridHeight = global.AANTAL_VERTICAAL*150+20;

    const $grid =  document.getElementById("grid");
    $grid.style.width =  `${gridWidth}px`;
    $grid.style.height =  `${gridHeight}px`; 
    $grid.style.gridTemplateColumns = `repeat(${global.AANTAL_HORIZONTAAL}, minmax(0, 1fr))`;
}

const handleWinCards = ($firstCard, $secondCard) => {
    setTimeout(() => {
        $firstCard.parentNode.classList.add('success');
        $secondCard.parentNode.classList.add('success');

        $firstCard.remove();
        $secondCard.remove();

        global.SELECTED = [];
        global.COUNTER++;
        if(global.COUNTER === global.AANTAL_KAARTEN){
            alert('Gewonnen!');
        }
    }, 1000)
}

const handleResetSelectedState = ($firstCard, $secondCard) => {
    setTimeout(() => {
        $firstCard.classList.remove('selected');
        $secondCard.classList.remove('selected');
        global.SELECTED = [];
    }, 1000);
}

const handleCheckSelectedCards = () => {
    const $firstCard = global.SELECTED[0];
    const $secondCard = global.SELECTED[1];

    if(global.SELECTED.length < 2){
        return;
    }

    if($firstCard.src === $secondCard.src){
        handleWinCards($firstCard, $secondCard);
        return;
    }

    handleResetSelectedState($firstCard, $secondCard);
}

const handleClickCard = ($img) => {
    if(global.SELECTED.length >= 2){
        return;
    }

    global.SELECTED.push($img);
    $img.classList.add('selected');

    handleCheckSelectedCards();
}

const handleRenderCard = (image) => {
    // Create image.
    const $img = document.createElement("img");
    $img.src = image;
    $img.alt = "image";
    $img.classList.add('image');
    $img.addEventListener("click", () => {
        handleClickCard($img);
    });

    // Append image to container.
    const $container = document.createElement("div");
    $container.appendChild($img);

    // Append container to grid.
    const $grid = document.getElementById("grid");
    $grid.appendChild($container);
}

const setup = () => {
    const cards = handleGenerateCards();

    handleRenderGrid();

    for (let i = 0; i < cards.length; i++){
        handleRenderCard(cards[i]);
    }

}


window.addEventListener("load", setup);