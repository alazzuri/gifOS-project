

// CAMBIO BOTON BUSCAR
const $SEARCHFIELD = document.querySelector("#searchbar");
const $RESULTSFIELD = document.querySelector("#suggested-results");
const $PREDICTIVE1 = document.querySelector("#suggested1");
const $PREDICTIVE2 = document.querySelector("#suggested2");
const $PREDICTIVE3 = document.querySelector("#suggested3");
const $RELATEDTAG1 = document.querySelector("#related1");
const $RELATEDTAG2 = document.querySelector("#related2");
const $RELATEDTAG3 = document.querySelector("#related3");
$SEARCH_BUTTON.disabled = true;

//CAPTURAR INPUT USUARIO

const getUserInput = () => {
    const input = document.querySelector("#searchbar").value;
    return input;
}

// RESETEAR CAMPO DE BUSQUEDA
function resetSearchField() {
    $SEARCHFIELD.value = "";
    $RESULTSFIELD.className = "hidden";
}

// CAMBIO COLORES BOTON AL INTRODUCIR INPUT
$SEARCHFIELD.onkeyup = () => {
    changeBtnStatus(getUserInput());
}

function changeBtnStatus(input) {
    const $GIFOSIMG = document.querySelector("#lens");
    const $BTNHOVER = document.querySelector("#search-hover");
    if (input !== "" && input !== " " && !input.includes("  ")) {
        $SEARCH_BUTTON.disabled = false;
        $SEARCH_BUTTON.classList.remove("btn-disabled");
        $SEARCH_BUTTON.classList.add("button-pink");
        $BTNHOVER.classList.add("dotted-border-102");
        if ($THEMESHEET.href.includes("theme1")) {
            $GIFOSIMG.src = "./assets/lupa.svg";
        } else {
            $GIFOSIMG.src = "./assets/lupa_light.svg";
        }
        obtainNames(input);
    } else {
        $RESULTSFIELD.className = "hidden";
        $SEARCH_BUTTON.disabled = true;
        $SEARCH_BUTTON.classList.remove("button-pink");
        $SEARCH_BUTTON.classList.add("btn-disabled");
        $BTNHOVER.classList.remove("dotted-border-102");
        if ($THEMESHEET.href.includes("theme1")) {
            $GIFOSIMG.src = "./assets/lupa_inactive.svg";
        } else {
            $GIFOSIMG.src = "./assets/Combined_Shape.svg";
        }
    }
}


// EJECUTO BUSQUEDA AL APRETAR ENTER
document.onkeypress = function (event) {
    if (getUserInput().length !== 0 && event.keyCode === 13) {
        cleanSearchHistory();
        // CAMBIO TITULO CONTENEDOR
        printSearchTitle(getUserInput());
        //EJECUTO BUSQUEDA E IMPRIMO
        renderResultGifs(SEARCH_URL, `?q=${getUserInput()}`);
        printResultButton();
        changeBtnStatus(getUserInput());
    }
}

// EJECUTO BUSQUEDA AL HACER CLICK EN BOTON PREDICTIVO

$PREDICTIVE1.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE1.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
}

$PREDICTIVE2.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE2.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
}

$PREDICTIVE3.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE3.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
}

// FUNCION PARA CAMBIAR ETIQUETA BUSQUEDA
function printSearchTitle(input) {
    const $CONTAINER_TITLE = document.querySelector("#gif-container-title");
    $CONTAINER_TITLE.textContent = `Resultados para: ${input}`;
}

function hideSuggestedGifs() {
    const $SUGGESTED_SECTION = document.querySelector("#sugg-gifs");
    if ($SUGGESTED_SECTION.className !== "hidden") {
        $SUGGESTED_SECTION.className = "hidden";
    }
}

function printResultButton() {
    for (let i = 3; i >= 1; i--) {
        const $BUTTON_CONTAINER = document.querySelector("#related_buttons");
        const $BUTTONTEXT = document.querySelector(`#related${i}`);
        const $TEXT_ORIGIN = document.querySelector(`#suggested${i}`);
        const TEXT_TO_PRINT = $TEXT_ORIGIN.textContent.toLowerCase();
        const SPLIT_NAME = TEXT_TO_PRINT.split(" ");
        $BUTTONTEXT.textContent = `${printResultTags(SPLIT_NAME)}`;
        $BUTTON_CONTAINER.className = "related-results";
    }
    hideSuggestedGifs();
};

const printResultTags = (splitName) => {
    let nameToPrint = "";
    counter = 0;
    for (let i = 0; i < splitName.length; i++) {
        if (nameToPrint.length < 20 && splitName[counter] !== "gif") {
            const TAG_TO_PRINT = splitName[counter];
            nameToPrint = nameToPrint + `${TAG_TO_PRINT}`;
            counter++;
        }
    }
    return nameToPrint;
}

$RELATEDTAG1.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested1`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
};

$RELATEDTAG2.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested2`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
};

$RELATEDTAG3.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested3`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    renderResultGifs(SEARCH_URL, `?q=${BUTTONTEXT}`);
    printResultButton();
};
