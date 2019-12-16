

// URL PARA HACER SEARCH REQUEST
const searchUrl = "https://api.giphy.com/v1/gifs/search?q=";
const trendUrl = "https://api.giphy.com/v1/gifs/trending";
// VALIDAR API
const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx";
// TODO COORREGIR CON LA CLASE CORRECTA DEL SELECTOR - ASIGNAR EN HTML
const $TRENDCONTAINER = document.querySelector(".trending-gifs-container");
const $RESULTSCONTAINER = document.querySelector(".main-container");
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
    obtainUrls(searchUrl, userRequest, 20, $TRENDCONTAINER, "trend-gif", "trend");
}

// FUNCION PARA LIMPIAR EL ARRAY
function cleanSearchHistory() {
    const $GIFSTOREMOVE = document.querySelectorAll(".trend-gif")
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
const obtainUrls = async function (url, request, limit, container, gifClass, type) {
    const URLS = await getSearchResults(url, request, limit);
    let gifCounter = 0;
    spanCounter = 0;
    URLS.data.forEach(data => {
        const URL_GIF = data.images.original.url;
        const WIDHT_GIF = data.images.original.width
        const GIF_DESCRIPTION = data.title.toLowerCase();
        let randomNumber = Math.ceil(Math.random() * 10)
        printGifs(URL_GIF, container, gifClass, type, gifCounter);
        printGifTags(GIF_DESCRIPTION, type, gifCounter);
        if (randomNumber % 2 === 0 && spanCounter < 4 && +WIDHT_GIF > 200) {
            applySpan(type, gifCounter);
            spanCounter++;
        }
        gifCounter++;
    });
}

// FUNCION PARA IMPRIMIR LAS IMAGENES
function printGifs(url, container, gifClass, type, counter) {
    $CONTENEDORIMG = document.createElement("figure");
    $GIF_IMG = document.createElement("img");
    $CONTENEDORIMG.className = `${gifClass}`;
    $CONTENEDORIMG.setAttribute("id", `${type}-${counter}`);
    $GIF_IMG.style.backgroundColor = `rgb(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200})`;
    $GIF_IMG.src = `${url}`;
    $CONTENEDORIMG.appendChild($GIF_IMG);
    container.appendChild($CONTENEDORIMG);
    //TODO VER QUE EL RESET DEL SEARCHFIELD DEBERIA IR EN OTRO LADO
    resetSearchField();
}

// HAGO UNA FUNCION PARA PASAR SPAN
function applySpan(type, counter) {
    const $GIFTOSPAN = document.querySelector(`#${type}-${counter}`);
    $GIFTOSPAN.classList.add("gif-span");
};


// FUNCiON PARA IMPIRMIR LOS TAGS DE LOS GIFS 
const printGifTags = function (gifName, type, counter) {
    const GIF_TAG = document.querySelector(`#${type}-${counter}`);
    const $TAG_CONTAINER = document.createElement("figcaption");
    const SPLIT_NAME = gifName.split(" ");
    let nameToPrint = "";
    const printTag = (splitName) => {
        counter = 0;
        for (let i = 0; i < splitName.length; i++) {
            if (nameToPrint.length < 20 && splitName[counter] !== "gif") {
                const TAG_TO_PRINT = splitName[counter];
                nameToPrint = nameToPrint + `#${TAG_TO_PRINT} `;
                counter++;
            }
        }
        if (nameToPrint === "# " || nameToPrint === "" || nameToPrint === " ") {
            nameToPrint = "#trending #popular";
        }
    }
    printTag(SPLIT_NAME);
    $TAG_CONTAINER.textContent = `${nameToPrint}`;
    $TAG_CONTAINER.classList.add("gradient-background");
    GIF_TAG.appendChild($TAG_CONTAINER);
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
    $RESULTSFIELD.className = "suggested-results";
}

function printSuggestedResults(title, counter) {
    let $SUGGESTED_RESULT = document.querySelector(`#suggested${counter}`);
    $SUGGESTED_RESULT.textContent = title;
}

// FUNCTION PARA TRAER GIFS SUGERIDOS


const getSuggestedGifs = async function (gifContainer, topic, tag, counter) {
    const SUGGESTED_GIF = await getSearchResults(searchUrl, topic, 1);
    SUGGESTED_GIF.data.forEach(data => {
        const URL = data.images.original.url;
        let container = document.querySelector(gifContainer);
        container.src = URL;
        printGifTitle(data, tag, counter)
    })
}


const printGifTitle = function (gifName, tag, counter) {
    const gifTitle = document.querySelector(tag + counter);
    const NAMES = gifName.title.toLowerCase();
    const SPLIT_NAME = NAMES.split(" ");
    const printName = (splitName) => {
        let nameToPrint = "";
        counter = 0;
        for (let i = 0; i < splitName.length; i++) {
            if (nameToPrint.length < 20 && splitName[counter] !== "gif") {
                const LOWER_WORD = splitName[counter];
                const WORD_TO_PRINT = LOWER_WORD.split("");
                const UPPER_LETTER = WORD_TO_PRINT[0].toUpperCase();
                WORD_TO_PRINT[0] = `${UPPER_LETTER}`;
                nameToPrint = nameToPrint + WORD_TO_PRINT.join("");
                counter++;
            }
        }
        return nameToPrint;
    }
    gifTitle.textContent = `#${printName(SPLIT_NAME)}`;
}

function printSuggestedGifs() {
    const RANDOM_TOPICS = ["cat", "sherlock", "sailor moon", "pokemon", "homer", "love",
        "puppy", "funny", "awesome", "no", "avengers", "floss dance", "unicorns", "hifive",
        "harry-potter", "lion-king", "the office", "wedding", "goku", "star wars", "silicon valley"];
    let usedTopics = [];
    let counter = 1
    for (let i = 1; i <= RANDOM_TOPICS.length; i++) {
        if ((counter <= 4)) {
            const TOPIC_INDEX = Math.floor(Math.random() * RANDOM_TOPICS.length);
            const CHOSEN_TOPIC = RANDOM_TOPICS[TOPIC_INDEX];
            let gifContainer = `#suggested-gif-${counter}`;
            if (!usedTopics.includes(CHOSEN_TOPIC)) {
                getSuggestedGifs(gifContainer, CHOSEN_TOPIC, "#suggested-title-", counter);
                usedTopics.push(CHOSEN_TOPIC);
                counter++;
            }
        } else {
            return true;
        }
    }
}

// FUNCTION PARA OBTENER TRENDING GIFS

const getTrendingGifs = async function () {
    const TRENDING_GIFS = await obtainUrls(trendUrl, "?", 20, $TRENDCONTAINER, "trend-gif", "trend");
    return TRENDING_GIFS;
}




