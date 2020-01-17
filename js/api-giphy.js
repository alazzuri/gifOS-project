const SEARCH_URL = "https://api.giphy.com/v1/gifs/search";
const TREND_URL = "https://api.giphy.com/v1/gifs/trending";
const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx";
const $SEARCH_BUTTON = document.querySelector("#search");
const suggestedTags = {};

$SEARCH_BUTTON.onclick = () => {
  const userRequest = getUserInput();
  cleanSearchHistory();
  printSearchTitle(userRequest);
  renderResultGifs(SEARCH_URL, `?q=${userRequest}`);
  // printResultButton();
};

const cleanSearchHistory = () => {
  const $GIFS_TO_REMOVE = document.querySelectorAll(".result-gif");
  $GIFS_TO_REMOVE.forEach(element => element.remove());
};

const getSearchResults = (url, requestType, limit = 20) => {
  const found = fetch(
    url + requestType + "&api_key=" + API_KEY + "&limit=" + limit
  ).then(response => {
    return response.json();
  });
  return found;
};

//TENGO QUE VER DE IMPRIMIR LOS BOTONES AZULES MAS DE TRES Y QUE TOME EL INPUT PARA PODER HACERLO
//CON EL BOTON DE VER MAS.
const renderResultGifs = async function(url, requestType) {
  const URLS = await getSearchResults(url, requestType);
  const printedTags = [];
  let gifCounter = 0;
  let spanCounter = 0;
  URLS.data.forEach(data => {
    const URL_GIF = data.images.original.url;
    const WIDHT_GIF = data.images.original.width;
    const GIF_DESCRIPTION = data.title.toLowerCase();
    const RANDOM_NUMBER = Math.ceil(Math.random() * 10);
    printGifs(URL_GIF, gifCounter);
    printGifTags(GIF_DESCRIPTION, gifCounter);
    if (
      url === SEARCH_URL &&
      !printedTags.includes(GIF_DESCRIPTION) &&
      GIF_DESCRIPTION.length > 3
    ) {
      printResultButton(GIF_DESCRIPTION);
      printedTags.push(GIF_DESCRIPTION);
    }
    if (RANDOM_NUMBER % 2 === 0 && spanCounter < 4 && +WIDHT_GIF > 250) {
      applySpan(gifCounter);
      spanCounter++;
    }
    gifCounter++;
  });
  resetSearchField();
};

const printGifs = (url, counter) => {
  const $GIFS_CONTAINER = document.querySelector(".result-gifs-container");
  $CONTENEDOR_IMG = document.createElement("figure");
  $GIF_IMG = document.createElement("img");
  $CONTENEDOR_IMG.className = "result-gif";
  $CONTENEDOR_IMG.setAttribute("id", `result-${counter}`);
  $GIF_IMG.style.backgroundColor = `rgb(${Math.random() * 200}, 
    ${Math.random() * 200}, ${Math.random() * 200})`;
  $GIF_IMG.src = `${url}`;
  $CONTENEDOR_IMG.appendChild($GIF_IMG);
  $GIFS_CONTAINER.appendChild($CONTENEDOR_IMG);
};

const applySpan = counter => {
  const $GIF_TO_SPAN = document.querySelector(`#result-${counter}`);
  $GIF_TO_SPAN.classList.add("gif-span");
};

const printGifTags = (gifName, counter) => {
  const GIF_TAG = document.querySelector(`#result-${counter}`);
  const $TAG_CONTAINER = document.createElement("figcaption");
  const SPLIT_NAME = gifName.split(" ");
  $TAG_CONTAINER.textContent = `${printTag(SPLIT_NAME)}`;
  $TAG_CONTAINER.classList.add("gradient-background");
  GIF_TAG.appendChild($TAG_CONTAINER);
};

const printTag = splitName => {
  let nameToPrint = "";
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
    return nameToPrint;
  } else {
    return nameToPrint;
  }
};

const obtainNames = async function(input) {
  const NAMES = await getSearchResults(SEARCH_URL, `?q=${input}`);
  let counter = 1;
  const PREVIOUSRESULTS = [];
  NAMES.data.forEach(data => {
    const TITLE = data.title.toUpperCase();
    if (
      TITLE != " " &&
      TITLE != "" &&
      counter < 4 &&
      !PREVIOUSRESULTS.includes(TITLE)
    ) {
      printSuggestedResults(TITLE, counter);
      PREVIOUSRESULTS.push(TITLE);
      return counter++;
    }
  });
  $RESULTSFIELD.className = "suggested-results";
};

const printSuggestedResults = (title, counter) => {
  const $SUGGESTED_RESULT = document.querySelector(`#suggested${counter}`);
  $SUGGESTED_RESULT.textContent = title;
};

const getSuggestedGifs = async function(gifContainer, topic, tag, counter) {
  const SUGGESTED_GIF = await getSearchResults(SEARCH_URL, `?q=${topic}`, 1);
  SUGGESTED_GIF.data.forEach(data => {
    const URL = data.images.original.url;
    const container = document.querySelector(gifContainer);
    container.src = URL;
    printGifTitle(data, tag, counter);
  });
};

const printGifTitle = (gif, tag, counter) => {
  const gifTitle = document.querySelector(tag + counter);
  const NAMES = gif.title.toLowerCase();
  // ACA CREO EL OBJETO PARA GUARDAR LOS TAGS SUGERIDOS.
  suggestedTags[`suggested-link-${counter}`] = NAMES;
  const SPLIT_NAME = NAMES.split(" ");
  gifTitle.textContent = `#${printName(SPLIT_NAME)}`;
};

const printName = splitName => {
  let nameToPrint = "";
  nameCounter = 0;
  for (let i = 0; i < splitName.length; i++) {
    if (nameToPrint.length < 20 && splitName[nameCounter] !== "gif") {
      const LOWER_WORD = splitName[nameCounter];
      const WORD_TO_PRINT = LOWER_WORD.split("");
      const UPPER_LETTER = WORD_TO_PRINT[0].toUpperCase();
      WORD_TO_PRINT[0] = `${UPPER_LETTER}`;
      nameToPrint = nameToPrint + WORD_TO_PRINT.join("");
      nameCounter++;
    }
  }
  return nameToPrint;
};

const printSuggestedGifs = () => {
  const RANDOM_TOPICS = [
    "cat",
    "sherlock",
    "sailor moon",
    "pokemon",
    "homer",
    "love",
    "puppy",
    "funny",
    "awesome",
    "no",
    "avengers",
    "floss dance",
    "unicorns",
    "hifive",
    "harry potter",
    "lion-king",
    "the office",
    "futurama",
    "wedding",
    "goku",
    "star wars",
    "silicon valley",
    "disney",
    "marvel",
    "the mandalorian"
  ];
  let usedTopics = [];
  let counter = 1;
  for (let i = 1; i <= RANDOM_TOPICS.length; i++) {
    if (counter <= 4) {
      const TOPIC_INDEX = Math.floor(Math.random() * RANDOM_TOPICS.length);
      const CHOSEN_TOPIC = RANDOM_TOPICS[TOPIC_INDEX];
      const gifContainer = `#suggested-gif-${counter}`;
      if (!usedTopics.includes(CHOSEN_TOPIC)) {
        getSuggestedGifs(
          gifContainer,
          CHOSEN_TOPIC,
          "#suggested-title-",
          counter
        );
        usedTopics.push(CHOSEN_TOPIC);
        counter++;
      }
    } else {
      printMoreResults();
      return true;
    }
  }
};

const printMoreResults = () => {
  const linkButtons = document.querySelectorAll(".suggested-links");
  linkButtons.forEach(element => {
    element.onclick = e => {
      const gifTag = suggestedTags[e.target.id].toUpperCase();
      cleanSearchHistory();
      printSearchTitle(gifTag);

      renderResultGifs(SEARCH_URL, `?q=${gifTag}`);
      // printResultButton();
    };
  });
};

const getTrendingGifs = async function() {
  const TRENDING_GIFS = await renderResultGifs(TREND_URL, "?");
  return TRENDING_GIFS;
};
