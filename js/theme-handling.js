const $THEMEBUTTON = document.querySelector("#drop-down");
const $THEMELIST = document.querySelector("#theme-list");
const $DAYTHEMESPAN = document.querySelector("#day-theme");
const $NIGHTTHEMESPAN = document.querySelector("#night-theme");
const $THEMEDAYBUTTON = document.querySelector(".theme-day");
const $THEMENIGHTBUTTON = document.querySelector(".theme-night")
const $GIFOSLOGO = document.querySelector("#gifos-img");
const $LENS = document.querySelector("#lens")


function openThemeSelector() {
    if ($THEMELIST.className === "hidden") {
        $THEMELIST.className = "themes-list";
    } else if ($THEMELIST.className === "themes-list") {
        $THEMELIST.className = "hidden";
    }
}

function applyTheme(theme) {
    if (theme.className.includes("theme-day")) {
        $THEMESHEET.href = "./styles/styles-theme1.css"
        $DAYTHEMESPAN.className = "underlined"
        $NIGHTTHEMESPAN.classList.remove("underlined");
        $GIFOSLOGO.src = "./assets/gifOF_logo.png"
        $LENS.src = "./assets/lupa_inactive.svg";
    } else if (theme.className.includes("theme-night")) {
        $THEMESHEET.href = "./styles/styles-theme2.css"
        $NIGHTTHEMESPAN.className = "underlined"
        $DAYTHEMESPAN.classList.remove("underlined");
        $GIFOSLOGO.src = "./assets/gifOF_logo_dark.png"
        $LENS.src = "./assets/Combined_Shape.svg";
    }
}

$THEMEBUTTON.onclick = function () {
    openThemeSelector();
}

$THEMEDAYBUTTON.onclick = function () {
    applyTheme($THEMEDAYBUTTON);
}

$THEMENIGHTBUTTON.onclick = function () {
    applyTheme($THEMENIGHTBUTTON);
}