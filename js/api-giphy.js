
// ASIGNAR ID EN HTML
const $SEARCHBUTTON = document.querySelector("#search");
// VALIDAR API
const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx";
// TODO COORREGIR CON LA CLASE CORRECTA DEL SELECTOR - ASIGNAR EN HTML
const $MAINCONTAINER = document.querySelector(".main-container");


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
function getSearchResults(request) {
    const found = fetch("https:/api.giphy.com/v1/gifs/search?q=" + request + "&api_key=" + API_KEY)
        .then((response) => {
            return response.json()
        });
    return found
}

// TOMO EL RESPONSE DE GIPHY Y LLAMO A LA FUNCION PARA IMPRIMIR POR CADA ITERACION.
// PASO URLS COMO PARAMETRO.
const obtainUrls = async function sacarUrls(userRequest) {
    const URLS = await getSearchResults(userRequest)
    URLS.data.forEach(data => {
        printGifs(data.images.original.url)
    });
}

// FUNCION PARA IMPRIMIR LAS IMAGENES
function printGifs(urlAImprimir) {
    $CONTENEDORIMG = document.createElement("img");
    $CONTENEDORIMG.className = "gif-container";
    $CONTENEDORIMG.src = `${urlAImprimir}`;
    $MAINCONTAINER.appendChild($CONTENEDORIMG);
}


