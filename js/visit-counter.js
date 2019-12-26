const $VISIT_COUNTER = document.querySelector("header");
const randomNumber = Math.ceil(Math.random() * 10000000);
const numberToPrint = formatNumber(randomNumber);
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
$VISIT_COUNTER.textContent = `¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de
visitas: ${numberToPrint}`;