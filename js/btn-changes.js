const buttonHandling = {
  searchBtn: document.querySelector("#search")
}; ////

// CAMBIO BOTON BUSCAR
const $SEARCHFIELD = document.querySelector("#searchbar");
buttonHandling.searchBtn.disabled = true;
$PREDICTIVE1 = document.querySelector("#suggested1");
$PREDICTIVE2 = document.querySelector("#suggested2");
$PREDICTIVE3 = document.querySelector("#suggested3");

//CAPTURAR INPUT USUARIO

const getUserInput = () => {
  const input = document.querySelector("#searchbar").value;
  return input;
};

// RESETEAR CAMPO DE BUSQUEDA
function resetSearchField() {
  $SEARCHFIELD.value = "";
  suggestedResults.resultContainer.className = "hidden";
}

// CAMBIO COLORES BOTON AL INTRODUCIR INPUT
$SEARCHFIELD.onkeyup = () => {
  changeBtnStatus(getUserInput());
};

function changeBtnStatus(input) {
  const $GIFOSIMG = document.querySelector("#lens");
  const $BTNHOVER = document.querySelector("#search-hover");
  if (input.length > 2 && !input.includes("  ")) {
    buttonHandling.searchBtn.disabled = false;
    buttonHandling.searchBtn.classList.remove("btn-disabled");
    buttonHandling.searchBtn.classList.add("button-pink");
    $BTNHOVER.classList.add("dotted-border-102");
    if ($THEMESHEET.href.includes("theme1")) {
      $GIFOSIMG.src = "./assets/lupa.svg";
    } else {
      $GIFOSIMG.src = "./assets/lupa_light.svg";
    }
    suggestedResults.obtainNames(input);
  } else {
    suggestedResults.resultContainer.className = "hidden";
    buttonHandling.searchBtn.disabled = true;
    buttonHandling.searchBtn.classList.remove("button-pink");
    buttonHandling.searchBtn.classList.add("btn-disabled");
    $BTNHOVER.classList.remove("dotted-border-102");
    if ($THEMESHEET.href.includes("theme1")) {
      $GIFOSIMG.src = "./assets/lupa_inactive.svg";
    } else {
      $GIFOSIMG.src = "./assets/Combined_Shape.svg";
    }
  }
}

// EJECUTO BUSQUEDA AL APRETAR ENTER
document.onkeypress = function(event) {
  if (getUserInput().length !== 0 && event.keyCode === 13) {
    renderGifs.cleanRenderedGifs();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(getUserInput());
    //EJECUTO BUSQUEDA E IMPRIMO
    renderGifs.renderResultGifs(
      giphyApi.searchEndpoint,
      `?q=${getUserInput()}`
    );
    // printResultButton();
    changeBtnStatus(getUserInput());
  }
};

// EJECUTO BUSQUEDA AL HACER CLICK EN BOTON PREDICTIVO

$PREDICTIVE1.onclick = function() {
  const BUTTONTEXT = $PREDICTIVE1.innerHTML;
  //LIMPIO ARRAY
  renderGifs.cleanRenderedGifs();
  // CAMBIO TITULO CONTENEDOR
  printSearchTitle(BUTTONTEXT);
  //EJECUTO BUSQUEDA E IMPRIMO
  renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
  //   printResultButton();
};

$PREDICTIVE2.onclick = function() {
  const BUTTONTEXT = $PREDICTIVE2.innerHTML;
  //LIMPIO ARRAY
  renderGifs.cleanRenderedGifs();
  // CAMBIO TITULO CONTENEDOR
  printSearchTitle(BUTTONTEXT);
  //EJECUTO BUSQUEDA E IMPRIMO
  renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
  printResultButton();
};

$PREDICTIVE3.onclick = function() {
  const BUTTONTEXT = $PREDICTIVE3.innerHTML;
  //LIMPIO ARRAY
  renderGifs.cleanRenderedGifs();
  // CAMBIO TITULO CONTENEDOR
  printSearchTitle(BUTTONTEXT);
  //EJECUTO BUSQUEDA E IMPRIMO
  renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
  //   printResultButton();
};

// FUNCION PARA CAMBIAR ETIQUETA BUSQUEDA
function printSearchTitle(input) {
  const $CONTAINER_TITLE = renderGifs.resultsTitle;
  $CONTAINER_TITLE.textContent = `Resultados para: ${input}`;
}

function hideSuggestedGifs() {
  const $SUGGESTED_SECTION = document.querySelector("#gifs-suggested");
  if ($SUGGESTED_SECTION.className !== "hidden") {
    $SUGGESTED_SECTION.className = "hidden";
  }
}

function hideSearcSection() {
  const $SEARCH_SECTION = document.querySelector("#search-section");
  if ($SEARCH_SECTION.className !== "hidden") {
    $SEARCH_SECTION.className = "hidden";
  }
}

function hideNavBar() {
  const $NAV_BAR = document.querySelector("nav");
  if ($NAV_BAR.className !== "hidden") {
    $NAV_BAR.className = "hidden";
  }
}

function handleGifsSection() {
  const $GIF_CONTAINER = document.querySelector("#gifs-main-section");
  $GIF_CONTAINER.className !== "hidden"
    ? ($GIF_CONTAINER.className = "hidden")
    : ($GIF_CONTAINER.className = "result-gifs");
}

function handleArrowBack() {
  const $ARROW_BACK = document.querySelector("#back-arrow");
  $ARROW_BACK.className !== "hidden"
    ? ($ARROW_BACK.className = "hidden")
    : ($ARROW_BACK.className = "arrow-back");
}

function showErrorMsg(error) {
  const $ERROR_WINDOW = document.querySelector("#error-msg");
  const $ERROR_DESCRIPTION = document.querySelector("#error-description");
  $ERROR_WINDOW.className !== "hidden"
    ? ($ERROR_WINDOW.className = "hidden")
    : (($ERROR_WINDOW.className = "error-window"),
      ($ERROR_DESCRIPTION.textContent = error));
}

function printResultButton(input) {
  const $BUTTON_CONTAINER = document.querySelector("#related_buttons");
  const $BUTTONTEXT = document.createElement("button");
  const $TEXT_ORIGIN = input;
  const TEXT_TO_PRINT = $TEXT_ORIGIN.toLowerCase();
  const SPLIT_NAME = TEXT_TO_PRINT.split(" ");
  $BUTTON_CONTAINER.className = "related-results";
  $BUTTONTEXT.textContent = `#${printResultTags(SPLIT_NAME)}`;
  $BUTTON_CONTAINER.appendChild($BUTTONTEXT);
  $BUTTONTEXT.onclick = () => {
    const BUTTONTEXT = input.toUpperCase();
    renderGifs.cleanRenderedGifs();
    // CAMBIO TITULO CONTENEDOR
    printSearchTitle(BUTTONTEXT);
    //EJECUTO BUSQUEDA E IMPRIMO
    renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
  };
  hideSuggestedGifs();
}

const printResultTags = splitName => {
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
};

buttonHandling.searchBtn.onclick = () => {
  const userRequest = getUserInput();
  renderGifs.cleanRenderedGifs();
  printSearchTitle(userRequest);
  renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${userRequest}`);
};
