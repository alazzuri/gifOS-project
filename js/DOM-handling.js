const domHandling = {
  searchForm: document.querySelector("#search-form"),
  searchbar: document.querySelector("#searchbar"),
  searchBtn: document.querySelector("#search"),
  suggestedResult1: document.querySelector("#suggested1"),
  suggestedResult2: document.querySelector("#suggested2"),
  suggestedResult3: document.querySelector("#suggested3"),
  resultsTitle: document.querySelector("#gif-container-title"),

  getUserInput: () => {
    const input = domHandling.searchbar.value;
    return input;
  },
  resetSearchField: () => {
    domHandling.searchbar.value = null;
    suggestedResults.resultContainer.className = "hidden";
  },

  changeBtnStatus: input => {
    const $LENS_IMG = document.querySelector("#lens");
    const $BTN_HOVER = document.querySelector("#search-hover");
    if (input.length > 2 && !input.includes("  ")) {
      domHandling.searchBtn.disabled = false;
      domHandling.searchBtn.classList.remove("btn-disabled");
      domHandling.searchBtn.classList.add("button-pink");
      $BTN_HOVER.classList.add("dotted-border-102");
      if ($THEMESHEET.href.includes("theme1")) {
        $LENS_IMG.src = "./assets/lupa.svg";
      } else {
        $LENS_IMG.src = "./assets/lupa_light.svg";
      }
      suggestedResults.obtainNames(input);
    } else {
      suggestedResults.resultContainer.className = "hidden";
      domHandling.searchBtn.disabled = true;
      domHandling.searchBtn.classList.remove("button-pink");
      domHandling.searchBtn.classList.add("btn-disabled");
      $BTN_HOVER.classList.remove("dotted-border-102");
      if ($THEMESHEET.href.includes("theme1")) {
        $LENS_IMG.src = "./assets/lupa_inactive.svg";
      } else {
        $LENS_IMG.src = "./assets/Combined_Shape.svg";
      }
    }
  },

  printSearchTitle: input => {
    const $CONTAINER_TITLE = domHandling.resultsTitle;
    $CONTAINER_TITLE.textContent = `Resultados para: ${input.toUpperCase()}`;
  },

  printRelatedButtons: input => {
    const $BUTTONS_CONTAINER = document.querySelector("#related_buttons");
    const $BUTTON = document.createElement("button");
    const receivedText = input;
    const textToPrint = receivedText.toLowerCase();
    $BUTTONS_CONTAINER.className = "related-results";
    $BUTTON.className = "related-tag";
    $BUTTON.textContent = `#${domHandling.printResultTags(
      textToPrint.split(" ")
    )}`;
    $BUTTONS_CONTAINER.appendChild($BUTTON);
    $BUTTON.onclick = () => {
      const searchTerm = input.toUpperCase();
      renderGifs.cleanRenderedGifs();
      domHandling.removeRelatedButtons();
      domHandling.printSearchTitle(searchTerm);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${searchTerm}`);
    };
  },

  removeRelatedButtons: () => {
    const $BUTTONS = document.querySelectorAll(".related-tag");
    $BUTTONS.forEach(element => element.remove());
  },

  handleSuggestedGifs: () => {
    const $SUGGESTED_SECTION = document.querySelector("#gifs-suggested");
    $SUGGESTED_SECTION.className !== "hidden"
      ? ($SUGGESTED_SECTION.className = "hidden")
      : ($SUGGESTED_SECTION.className = "suggested-gifs");
  },

  handleSearchSection: () => {
    const $SEARCH_SECTION = document.querySelector("#search-section");
    $SEARCH_SECTION.className !== "hidden"
      ? ($SEARCH_SECTION.className = "hidden")
      : ($SEARCH_SECTION.className = "gifs-search");
  },

  handleNavBar: () => {
    const $NAV_BAR = document.querySelector("nav");
    $NAV_BAR.className !== "hidden"
      ? ($NAV_BAR.className = "hidden")
      : ($NAV_BAR.className = "gifs-search");
  },

  handleGifsSection: () => {
    const $GIF_CONTAINER = document.querySelector("#gifs-main-section");
    $GIF_CONTAINER.className !== "hidden"
      ? ($GIF_CONTAINER.className = "hidden")
      : ($GIF_CONTAINER.className = "result-gifs");
  },

  handleArrowBack: () => {
    const $ARROW_BACK = document.querySelector("#back-arrow");
    $ARROW_BACK.className !== "hidden"
      ? ($ARROW_BACK.className = "hidden")
      : ($ARROW_BACK.className = "arrow-back");
  },

  showErrorMsg: error => {
    const $ERROR_WINDOW = document.querySelector("#error-msg");
    const $ERROR_DESCRIPTION = document.querySelector("#error-description");
    $ERROR_WINDOW.className !== "hidden"
      ? ($ERROR_WINDOW.className = "hidden")
      : (($ERROR_WINDOW.className = "error-window"),
        ($ERROR_DESCRIPTION.textContent = error));
  },

  printResultTags: splitName => {
    let nameToPrint = "";
    counter = 0;
    for (let i = 0; i < splitName.length; i++) {
      if (nameToPrint.length < 20 && splitName[counter] !== "gif") {
        const tagToPrint = splitName[counter];
        nameToPrint = nameToPrint + `${tagToPrint}`;
        counter++;
      }
    }
    return nameToPrint;
  },

  handlerEvents: () => {
    domHandling.searchbar.oninput = () => {
      domHandling.changeBtnStatus(domHandling.getUserInput());
    };

    domHandling.searchForm.onsubmit = event => {
      renderGifs.cleanRenderedGifs();
      domHandling.removeRelatedButtons();
      domHandling.printSearchTitle(domHandling.getUserInput());
      renderGifs.renderResultGifs(
        giphyApi.searchEndpoint,
        `?q=${domHandling.getUserInput()}`
      );
      domHandling.resetSearchField();

      event.preventDefault();
    };

    domHandling.suggestedResult1.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult1.innerHTML;
      renderGifs.cleanRenderedGifs();
      domHandling.removeRelatedButtons();
      domHandling.printSearchTitle(BUTTONTEXT);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
    };

    domHandling.suggestedResult2.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult2.innerHTML;
      renderGifs.cleanRenderedGifs();
      domHandling.removeRelatedButtons();
      domHandling.printSearchTitle(BUTTONTEXT);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
    };

    domHandling.suggestedResult3.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult3.innerHTML;
      renderGifs.cleanRenderedGifs();
      domHandling.removeRelatedButtons();
      domHandling.printSearchTitle(BUTTONTEXT);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
    };
  }
}; ////
