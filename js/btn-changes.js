
// CAMBIO BOTON BUSCAR
let $INPUT;
const $KEYBOARD = document.querySelector("#searchbar");
const $GIFOSIMG = document.querySelector("#lens")
const $BTNHOVER = document.querySelector("#search-hover");
$SEARCHBUTTON.disabled = true;

$KEYBOARD.onkeyup = function () {
    $INPUT = document.querySelector("#searchbar").value;
    changeBtnStatus($INPUT);
    return $INPUT;
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
    } else {
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