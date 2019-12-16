

// CAMBIO BOTON BUSCAR
let INPUT = "";
const $SEARCHFIELD = document.querySelector("#searchbar");
const $GIFOSIMG = document.querySelector("#lens")
const $BTNHOVER = document.querySelector("#search-hover");
const $RESULTSFIELD = document.querySelector("#suggested-results");
const $PREDICTIVE1 = document.querySelector("#suggested1");
const $PREDICTIVE2 = document.querySelector("#suggested2");
const $PREDICTIVE3 = document.querySelector("#suggested3");
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
    if (input !== "") {
        $SEARCHBUTTON.disabled = false;
        $SEARCHBUTTON.classList.remove("btn-disabled");
        $SEARCHBUTTON.classList.add("button-pink");
        $BTNHOVER.classList.add("dotted-border-102");
        if ($THEMESHEET.href.includes("theme1")) {
            $GIFOSIMG.src = "./assets/lupa.svg";
        } else {
            $GIFOSIMG.src = "./assets/lupa_light.svg";
        }
        obtainNames(INPUT);
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

// EJECUTO BUSQUEDA AL HACER CLICK EN BOTON PREDICTIVO

$PREDICTIVE1.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE1.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
}

$PREDICTIVE2.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE1.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
}

$PREDICTIVE3.onclick = function () {
    const BUTTONTEXT = $PREDICTIVE1.innerHTML;
    //LIMPIO ARRAY
    cleanSearchHistory();
    //EJECUTO BUSQUEDA E IMPRIMO
    obtainUrls(searchUrl, BUTTONTEXT, 20, $TRENDCONTAINER, "trend-gif", "trend");
}