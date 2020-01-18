const giphyApi = {
  searchEndpoint: "https://api.giphy.com/v1/gifs/search",
  trendEndpoint: "https://api.giphy.com/v1/gifs/trending",
  apiKey: "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx",

  getSearchResults: (url, requestType, limit = 20) => {
    const API_KEY = giphyApi.apiKey;
    const found = fetch(
      url + requestType + "&api_key=" + API_KEY + "&limit=" + limit
    ).then(response => {
      return response.json();
    });
    return found;
  }
};

const renderGifs = {
  cleanRenderedGifs: () => {
    const $GIFS_TO_REMOVE = document.querySelectorAll(".result-gif");
    $GIFS_TO_REMOVE.forEach(element => element.remove());
  },

  renderResultGifs: async (url, requestType) => {
    const gifsObject = await giphyApi.getSearchResults(url, requestType);
    const printedTags = []; // ESTE ARRAY ALMACENA LOS TITULOS YA IMPRESOS COMO TAGS RELACIONADOS PARA QUE NO SE REPITAN
    let gifCounter = 0; // ESTE COUNTER ME PERMITE ASIGNARLE ID A LOS ELEMENTOS DINAMICOS PARA MANIPULARLOS EN EL DOM.
    let spanCounter = 0; // CON ESTO SE LIMITA EL NUMERO DE IMAGENES DOBLES A UNA CANTIDAD MAXIMA (LINEA 46)
    gifsObject.data.forEach(data => {
      const gifUrl = data.images.original.url;
      const gifWidth = data.images.original.width;
      const gifHeigth = data.images.original.height;
      const gifDescription = data.title.toLowerCase();
      renderGifs.printGifs(gifUrl, gifCounter);
      renderGifs.printGifTags(gifDescription, gifCounter);
      if (
        url === giphyApi.searchEndpoint &&
        !printedTags.includes(gifDescription) &&
        gifDescription.length > 3
      ) {
        domHandling.printRelatedButtons(gifDescription);
        printedTags.push(gifDescription);
        domHandling.resultsTitle.scrollIntoView();
      }
      if (spanCounter < 4 && +gifWidth > +gifHeigth * 1.2) {
        renderGifs.applySpan(gifCounter);
        spanCounter++;
      }
      gifCounter++;
    });
    domHandling.resetSearchField();
  },

  printGifs: (url, counter) => {
    const $GIFS_CONTAINER = document.querySelector(".result-gifs-container");
    $IMG_CONTAINER = document.createElement("figure");
    $GIF_IMG = document.createElement("img");
    $IMG_CONTAINER.className = "result-gif";
    $IMG_CONTAINER.setAttribute("id", `result-${counter}`);
    $GIF_IMG.style.backgroundColor = `rgb(${Math.random() * 200},
      ${Math.random() * 200}, ${Math.random() * 200})`; // ESTA PROPIEDAD FIJA UN BACKGROUND ALEATORIO PARA CADA CONTENEDOR DE GIF
    $GIF_IMG.src = `${url}`;
    $IMG_CONTAINER.appendChild($GIF_IMG);
    $GIFS_CONTAINER.appendChild($IMG_CONTAINER);
  },

  applySpan: counter => {
    const $GIF_TO_SPAN = document.querySelector(`#result-${counter}`);
    $GIF_TO_SPAN.classList.add("gif-span");
  },

  printGifTags: (name, counter) => {
    const $GIF_CONTAINER = document.querySelector(`#result-${counter}`);
    const $TAG_CONTAINER = document.createElement("figcaption");
    const gifName = name.split(" ");
    $TAG_CONTAINER.textContent = `${renderGifs.createTag(gifName)}`;
    $TAG_CONTAINER.classList.add("gradient-background");
    $GIF_CONTAINER.appendChild($TAG_CONTAINER);
  },

  createTag: name => {
    let nameToPrint = "";
    counter = 0;
    for (let i = 0; i < name.length; i++) {
      if (nameToPrint.length < 20 && name[counter] !== "gif") {
        const tagToPrint = name[counter];
        nameToPrint = nameToPrint + `#${tagToPrint} `;
        counter++;
      }
    }
    if (nameToPrint === "# " || nameToPrint === "" || nameToPrint === " ") {
      nameToPrint = "#trending #popular";
      return nameToPrint;
    } else {
      return nameToPrint;
    }
  },

  getTrendingGifs: async () => {
    const TRENDING_GIFS = await renderGifs.renderResultGifs(
      giphyApi.trendEndpoint,
      "?"
    );
    return TRENDING_GIFS;
  }
};

const suggestedResults = {
  resultContainer: document.querySelector("#suggested-results"),

  obtainNames: async input => {
    const gifsObject = await giphyApi.getSearchResults(
      giphyApi.searchEndpoint,
      `?q=${input}`
    );
    let counter = 1;
    const previousResults = [];
    gifsObject.data.forEach(data => {
      const gifTitle = data.title.toUpperCase();
      if (
        gifTitle.length > 2 &&
        !gifTitle.includes("   ") &&
        counter < 4 &&
        !previousResults.includes(gifTitle)
      ) {
        suggestedResults.printSuggestedResults(gifTitle, counter);
        previousResults.push(gifTitle);
        return counter++;
      }
    });
    suggestedResults.resultContainer.className = "suggested-results";
  },

  printSuggestedResults: (title, counter) => {
    const $TEXT_CONTAINER = document.querySelector(`#suggested${counter}`);
    $TEXT_CONTAINER.textContent = title;
  }
};

const suggestedGifs = {
  gifTopics: [
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
  ],

  suggestedTags: {},

  printSuggestedGifs: () => {
    const topics = suggestedGifs.gifTopics;
    let usedTopics = [];
    let counter = 1;
    for (let i = 1; i <= topics.length; i++) {
      if (counter <= 4) {
        const topicIndex = Math.floor(Math.random() * topics.length);
        const chosenTopic = topics[topicIndex];
        const gifContainer = `#suggested-gif-${counter}`;
        if (!usedTopics.includes(chosenTopic)) {
          suggestedGifs.getSuggestedGifs(
            gifContainer,
            chosenTopic,
            "#suggested-title-",
            counter
          );
          usedTopics.push(chosenTopic);
          counter++;
        }
      } else {
        suggestedGifs.printMoreResults();
        return true;
      }
    }
  },

  getSuggestedGifs: async (gifContainer, topic, tag, counter) => {
    const gifsObject = await giphyApi.getSearchResults(
      giphyApi.searchEndpoint,
      `?q=${topic}`,
      1
    );
    gifsObject.data.forEach(data => {
      const gifUrl = data.images.original.url;
      const container = document.querySelector(gifContainer);
      container.src = gifUrl;
      suggestedGifs.printGifTitle(data, tag, counter);
    });
  },

  printGifTitle: (gif, tag, counter) => {
    const $GIF_CONTAINER = document.querySelector(tag + counter);
    const gifTitle = gif.title.toLowerCase();
    suggestedGifs.suggestedTags[`suggested-link-${counter}`] = gifTitle; // ESTE OBJETO ALMACENA LOS TAGS PARA EJECUTAR LA BUSQUEDA AL HACER CLICK EN EL BOTOON DE VER MAS
    $GIF_CONTAINER.textContent = `#${suggestedGifs.printName(
      gifTitle.split(" ")
    )}`;
  },

  printName: splitName => {
    let nameToPrint = "";
    nameCounter = 0;
    for (let i = 0; i < splitName.length; i++) {
      if (nameToPrint.length < 20 && splitName[nameCounter] !== "gif") {
        const receivedWord = splitName[nameCounter];
        const wordToPrint = receivedWord.split("");
        const upperCase = wordToPrint[0].toUpperCase();
        wordToPrint[0] = `${upperCase}`;
        nameToPrint = nameToPrint + wordToPrint.join("");
        nameCounter++;
      }
    }
    return nameToPrint;
  },

  printMoreResults: () => {
    const linkButtons = document.querySelectorAll(".suggested-links");
    linkButtons.forEach(element => {
      element.onclick = e => {
        const gifTag = suggestedGifs.suggestedTags[e.target.id].toUpperCase();
        renderGifs.cleanRenderedGifs();
        domHandling.removeRelatedButtons();
        domHandling.printSearchTitle(gifTag);
        renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${gifTag}`);
      };
    });
  }
};

const myGuifos = {
  myGuifosBtn: document.querySelector("#my-guifos-tag"),

  renderMyGuifos: () => {
    const $CONTAINER_TITLE = domHandling.resultsTitle;
    const totalGuifos = localStorage.length;
    renderGifs.cleanRenderedGifs();
    domHandling.removeRelatedButtons();
    $CONTAINER_TITLE.textContent = "My Guifos";
    for (let i = 0; i < totalGuifos; i++) {
      const gifUrl = localStorage.getItem(`my-guifos-${i}`);
      renderGifs.printGifs(gifUrl, i);
    }
    $CONTAINER_TITLE.scrollIntoView();
  }
};
