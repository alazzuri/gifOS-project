

// CAMBIO BOTON BUSCAR
let INPUT = "";
const $SEARCHFIELD = document.querySelector("#searchbar");
const $GIFOSIMG = document.querySelector("#lens")
const $BTNHOVER = document.querySelector("#search-hover");
const $RESULTSFIELD = document.querySelector("#suggested-results");
const $PREDICTIVE1 = document.querySelector("#suggested1");
const $PREDICTIVE2 = document.querySelector("#suggested2");
const $PREDICTIVE3 = document.querySelector("#suggested3");
const $RELATEDTAG1 = document.querySelector("#result1");
const $RELATEDTAG2 = document.querySelector("#result2");
const $RELATEDTAG3 = document.querySelector("#result3");
$SEARCHBUTTON.disabled = true;

// RESETEAR CAMPO DE BUSQUEDA
function resetSearchField() {
    $SEARCHFIELD.value = "";
    $RESULTSFIELD.className = "hidden"
}

// CAMBIO COLORES BOTON AL INTRODUCIR INPUT
$SEARCHFIELD.onkeyup = function () {
    INPUT = document.querySelector("#searchbar").value;
    changeBtnStatus(INPUT);
    return INPUT;
}

function changeBtnStatus(input) {
    if (input.length !== 0) {
        $SEARCHBUTTON.disabled = false;
        $SEARCHBUTTON.classList.remove("btn-disabled");
        $SEARCHBUTTON.classList.add("button-pink");
        $BTNHOVER.classList.add("dotted-border-102");
        if ($THEMESHEET.href.includes("theme1")) {
            $GIFOSIMG.src = "./assets/lupa.svg";
        } else {
            $GIFOSIMG.src = "./assets/lupa_light.svg";
        }
        obtainNames(input);
    } else {
        $RESULTSFIELD.className = "hidden";
        $SEARCHBUTTON.disabled = true;
        $SEARCHBUTTON.classList.remove("button-pink");
        $SEARCHBUTTON.classList.add("btn-disabled");
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
    if (INPUT.length !== 0 && event.keyCode === 13) {
        cleanSearchHistory();
        // CAMBIO TITULO CONTENEDOR
        printSearchTitle(INPUT);
        //EJECUTO BUSQUEDA E IMPRIMO
        obtainUrls(searchUrl, INPUT, 20, $TRENDCONTAINER, "trend-gif", "trend");
        printResultButton();
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
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
    printResultButton();
}

$PREDICTIVE2.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE2.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
    printResultButton();
}

$PREDICTIVE3.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE3.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
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
        const $BUTTON_CONTAINER = document.querySelector("#result_buttons");
        const $BUTTONTEXT = document.querySelector(`#result${i}`);
        const $TEXT_ORIGIN = document.querySelector(`#suggested${i}`);
        const TEXT_TO_PRINT = $TEXT_ORIGIN.textContent.toLowerCase();
        const SPLIT_NAME = TEXT_TO_PRINT.split(" ");
        let nameToPrint = "";
        const printTag = (splitName) => {
            counter = 0;
            for (let i = 0; i < splitName.length; i++) {
                if (nameToPrint.length < 20 && splitName[counter] !== "gif") {
                    const TAG_TO_PRINT = splitName[counter];
                    nameToPrint = nameToPrint + `${TAG_TO_PRINT}`;
                    counter++;
                }
            }
        }
        printTag(SPLIT_NAME);
        $BUTTONTEXT.textContent = `${nameToPrint}`;
        $BUTTON_CONTAINER.className = "related-results";
    }
    hideSuggestedGifs();
};

$RELATEDTAG1.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested1`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
    printResultButton();
};

$RELATEDTAG2.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested2`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
    printResultButton();
};

$RELATEDTAG3.onclick = function () {
    const $TEXT_ORIGIN = document.querySelector(`#suggested3`);
    const BUTTONTEXT = $TEXT_ORIGIN.textContent;
    cleanSearchHistory();
    // // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    // //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
    printResultButton();
};
