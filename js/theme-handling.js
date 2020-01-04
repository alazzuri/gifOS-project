// CAMBIO ENTRE TEMAS CON SELECTOR

const $THEMEBUTTON = document.querySelector("#drop-down");
const $THEMELIST = document.querySelector("#theme-list");
const $DAYTHEMESPAN = document.querySelector("#day-theme");
const $NIGHTTHEMESPAN = document.querySelector("#night-theme");
const $THEMEDAYBUTTON = document.querySelector(".theme-day");
const $THEMENIGHTBUTTON = document.querySelector(".theme-night")
const $GIFOSLOGO = document.querySelector("#gifos-img");
const $LENS = document.querySelector("#lens")


function openThemeSelector() {
    $THEMELIST.classList.toggle("themes-list");
}

function applyTheme(theme, input) {
    if (theme.className.includes("theme-day")) {
        $THEMESHEET.href = "./styles/styles-theme1.css"
        $DAYTHEMESPAN.className = "underlined"
        $NIGHTTHEMESPAN.classList.remove("underlined");
        $GIFOSLOGO.src = "./assets/gifOF_logo.png"
        changeBtnStatus(input);
    } else if (theme.className.includes("theme-night")) {
        $THEMESHEET.href = "./styles/styles-theme2.css"
        $NIGHTTHEMESPAN.className = "underlined"
        $DAYTHEMESPAN.classList.remove("underlined");
        $GIFOSLOGO.src = "./assets/gifOF_logo_dark.png";
        changeBtnStatus(input);
    }
}

$THEMEBUTTON.onclick = function () {
    openThemeSelector();
}

$THEMEDAYBUTTON.onclick = function () {
    applyTheme($THEMEDAYBUTTON, getUserInput());
}

$THEMENIGHTBUTTON.onclick = function () {
    applyTheme($THEMENIGHTBUTTON, getUserInput());
};

window.onclick = function (event) {
    if ($THEMELIST.classList[1] === "themes-list") {
        if (event.target.closest(".theme-selector")) {
            return
        } else {
            this.openThemeSelector();
        }
    }
};
