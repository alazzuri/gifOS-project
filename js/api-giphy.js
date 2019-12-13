

// URL PARA HACER SEARCH REQUEST
const searchUrl = "https:/api.giphy.com/v1/gifs/search?q=";
// VALIDAR API
const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx";
// TODO COORREGIR CON LA CLASE CORRECTA DEL SELECTOR - ASIGNAR EN HTML
const $MAINCONTAINER = document.querySelector(".main-container");
const $SEARCHBUTTON = document.querySelector("#search");
// TODO ==> REASIGNAR NOMBRE PARA USAR UNO SOLO
const $SEARCHBAR = document.querySelector("#searchbar");


// EJECUTA FUNCION AL HACER CLICK AL BOTON DE BUSQUEDA - VER COMO HACER PARA QUE TOME EL ENTER COMO INPUT
$SEARCHBUTTON.onclick = function () {
    //Capturo INPUT - ASIGNAR ID EN EL HTML.
    const userRequest = document.querySelector("#searchbar").value;
    //LIMPIO ARRAY
    cleanSearchHistory();
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(userRequest);
}

// FUNCION PARA LIMPIAR EL ARRAY
function cleanSearchHistory() {
    const $GIFSTOREMOVE = document.querySelectorAll(".gif-container")
    $GIFSTOREMOVE.forEach($GIFSTOREMOVE => {
        $GIFSTOREMOVE.remove()
    });
}

// REQUEST AL API DE GIPHY
function getSearchResults(url, request, limit) {
    const found = fetch(url + request + "&api_key=" + API_KEY + "&limit=" + limit)
        .then((response) => {
            return response.json()
        });
    return found
}

// TOMO EL RESPONSE DE GIPHY Y LLAMO A LA FUNCION PARA IMPRIMIR POR CADA ITERACION.
// PASO URLS COMO PARAMETRO.
const obtainUrls = async function (userRequest) {
    const URLS = await getSearchResults(searchUrl, userRequest)
    URLS.data.forEach(data => {
        printGifs(data.images.original.url)
    });
    resetSearchField();
}

// FUNCION PARA IMPRIMIR LAS IMAGENES
function printGifs(urlAImprimir) {
    $CONTENEDORIMG = document.createElement("img");
    $CONTENEDORIMG.className = "gif-container";
    $CONTENEDORIMG.src = `${urlAImprimir}`;
    $MAINCONTAINER.appendChild($CONTENEDORIMG);
}

//FUNCION PARA OBTENER NOMBRES PREDICTIVOS

const obtainNames = async function (input) {
    const NAMES = await getSearchResults(searchUrl, input, 10)
    let counter = 1;
    const PREVIOUSRESULTS = [];
    NAMES.data.forEach(data => {
        const TITLE = data.title.toUpperCase();
        if (TITLE != " " && TITLE != "" && counter < 4 && !PREVIOUSRESULTS.includes(TITLE)) {
            printSuggestedResults(TITLE, counter);
            PREVIOUSRESULTS.push(TITLE);
            return counter++;
        }
    }
    );
}

function printSuggestedResults(title, counter) {
    let $SUGGESTEDRESULT = document.querySelector(`#suggested${counter}`);
    $SUGGESTEDRESULT.textContent = title;
}



