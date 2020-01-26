const domHandling = {
  themeBtn: document.querySelector("#drop-down"),
  dayBtn: document.querySelector(".theme-day"),
  nightBtn: document.querySelector(".theme-night"),
  searchForm: document.querySelector("#search-form"),
  searchbar: document.querySelector("#searchbar"),
  searchBtn: document.querySelector("#search"),
  suggestedResult1: document.querySelector("#suggested1"),
  suggestedResult2: document.querySelector("#suggested2"),
  suggestedResult3: document.querySelector("#suggested3"),
  resultsTitle: document.querySelector("#gif-container-title"),
  createBtn: document.querySelector("#create-gif"),
  startBtn: document.querySelector("#start-preview"),
  cancelBtn: document.querySelector("#create-abort"),
  captureBtn: document.querySelector("#btn-capture"),
  readyBtn: document.querySelector("#btn-ready"),
  playBtn: document.querySelector("#btn-play"),
  recaptureBtn: document.querySelector("#btn-recapture"),
  uploadBtn: document.querySelector("#btn-upload"),
  copyBtn: document.querySelector("#copy-btn"),
  finishBtn: document.querySelector("#finish-btn"),
  abortBtn: document.querySelector("#btn-abort"),
  downloadBtn: document.querySelector("#download-btn"),

  openThemeSelector: () => {
    const $THEME_SELECTOR = document.querySelector("#theme-list");
    $THEME_SELECTOR.classList.toggle("hidden");
    if ($THEME_SELECTOR.className.includes("themes-list")) {
      window.onclick = e => {
        !e.target.closest(".theme-selector")
          ? domHandling.openThemeSelector()
          : true;
      };
    } else {
      window.onclick = () => true;
    }
  },

  applyTheme: selectedTheme => {
    const $S_SPAN_DAY = document.querySelector("#day-theme");
    const $S_SPAN_NIGHT = document.querySelector("#night-theme");
    const $GIFOS_LOGO = document.querySelector("#gifos-img");
    if (selectedTheme.className.includes("theme-day")) {
      $S_SPAN_DAY.className = "underlined";
      $S_SPAN_NIGHT.classList.remove("underlined");
      $GIFOS_LOGO.src = "./assets/gifOF_logo.png";
    } else if (selectedTheme.className.includes("theme-night")) {
      $S_SPAN_NIGHT.className = "underlined";
      $S_SPAN_DAY.classList.remove("underlined");
      $GIFOS_LOGO.src = "./assets/gifOF_logo_dark.png";
    }
  },

  getUserInput: () => {
    const input = domHandling.searchbar.value;
    return input;
  },
  resetSearchField: () => {
    domHandling.searchbar.value = null;
    suggestedResults.resultContainer.className = "hidden";
  },

  changeBtnStatus: input => {
    const $STYLESHEET = styleTheme.styleTag;
    const $LENS_IMG = document.querySelector("#lens");
    const $BTN_HOVER = document.querySelector("#search-hover");
    if (input.length > 2 && !input.includes("  ")) {
      domHandling.searchBtn.disabled = false;
      domHandling.searchBtn.classList.remove("btn-disabled");
      domHandling.searchBtn.classList.add("button-pink");
      $BTN_HOVER.classList.add("dotted-border-102");
      if ($STYLESHEET.href.includes("theme1")) {
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
      if ($STYLESHEET.href.includes("theme1")) {
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

  displayElements: ids => {
    ids.forEach(id => {
      const domElement = document.querySelector(id);
      domElement.classList.remove("hidden");
    });
  },

  hideElements: ids => {
    ids.forEach(id => {
      const domElement = document.querySelector(id);
      domElement.classList.add("hidden");
    });
  },

  //REEMPLAZAR
  handleDisplayAttribute: elements => {
    elements.forEach(item => {
      const domElement = document.querySelector(item);
      domElement.classList.toggle("hidden");
    });
  },

  getCurrentTime: () => {
    const $TIME_COUNTER = document.querySelector("#video-time");
    const video = createGif.userVideo;
    video.currentTime = 0;
    video.ontimeupdate = () => {
      createGif.gifTime = video.currentTime;
      $TIME_COUNTER.textContent = domHandling.renderTime(createGif.gifTime);
    };
  },

  renderTime: miliseconds => {
    dateObj = new Date(miliseconds * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    timeString =
      "00:" +
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    return timeString;
  },

  showTimeBar: () => {
    const timeSquares = document.querySelectorAll(".time-square");
    const totalTime = createGif.gifTime;
    const timePerSquare = +totalTime / (timeSquares.length - 1);
    let counter = 0;
    const resetBar = () => {
      timeSquares.forEach(element => element.classList.remove("square-pink"));
    };

    resetBar();

    createGif.userVideo.ontimeupdate = () => {
      const $TIME_COUNTER = document.querySelector("#video-time");
      const elapsedTime = createGif.userVideo.currentTime;
      $TIME_COUNTER.textContent = domHandling.renderTime(elapsedTime);
      if (
        elapsedTime > timePerSquare * counter &&
        counter < timeSquares.length
      ) {
        timeSquares[counter].classList.add("square-pink");
        counter++;
      }
    };

    createGif.userVideo.onended = () => {
      resetBar();
      createGif.userVideo.ontimeupdate = () => false;
      createGif.userVideo.onended = () => false;
    };
  },

  animateLoadingBar: () => {
    const loadingSquares = document.querySelectorAll(".loading-square");
    const barLenght = loadingSquares.length;
    const removeSquares = loadingSquares.forEach(element => {
      element.classList.remove("square-pink");
    })
    let intervalCounter = 0;
    const printSquare = () => {
      if (intervalCounter < barLenght) {
        loadingSquares[intervalCounter].classList.add("square-pink");
        intervalCounter++;
      } else {
        loadingSquares.forEach(element => {
          element.classList.remove("square-pink");
        });
        intervalCounter = 0;
      }
    };
    const interval = setInterval(printSquare, 800);
    setTimeout(() => {
      clearInterval(interval);
      removeSquares();
    }, 17000);
  },

  startCreatingGif: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#start-creating"
    ]);
    domHandling.hideElements(["nav", "#search-section", "#gifs-suggested"]);
    myGuifos.renderMyGuifos();
  },

  checkVideo: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#record-field",
      "#btn-capture",
      "video"
    ]);
    domHandling.hideElements([
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#start-creating",
      "#gifs-main-section",
      "#btn-ready",
      "#record-control",
      "#capture-confirm",
      "#upload-btn-container",
      "#loading-section",
      "#upload-abort"
    ]);
    domHandling.handleWindowsTitle("Un Chequeo Antes de Empezar");
    createGif.showUserVideo();
  },

  captureGif: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#record-field",
      "#btn-ready",
      "#record-control",
      "video"
    ]);
    domHandling.hideElements([
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#start-creating",
      "#gifs-main-section",
      "#btn-capture",
      "#capture-confirm",
      "#upload-btn-container",
      "#loading-section",
      "#upload-abort"
    ]);
    domHandling.handleWindowsTitle("Capturando Tu Guifo");
    createGif.startRecord();
  },

  showPreview: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#record-field",
      "#record-control",
      "#capture-confirm",
      "#upload-btn-container",
      "video"
    ]);
    domHandling.hideElements([
      "#btn-ready",
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#start-creating",
      "#gifs-main-section",
      "#btn-capture",
      "#loading-section",
      "#upload-abort"
    ]);
    domHandling.handleWindowsTitle("Vista Previa");
  },

  uploadGif: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#record-field",
      "#loading-section",
      "#upload-abort",
      "#capture-confirm"
    ]);
    domHandling.hideElements([
      "#upload-btn-container",
      "#btn-ready",
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#start-creating",
      "#gifs-main-section",
      "#record-control",
      "#btn-capture",
      "video"
    ]);
    domHandling.handleWindowsTitle("Subiendo tu Guifo");
    createGif.userVideo.src = null;
    domHandling.animateLoadingBar();
    observer.subscribe(domHandling.showSuccessWindows);
    // giphyApi.postGif();
  },

  showSuccessWindows: url => {
    const $UPLOADED_GIF = document.querySelector("#final-guifo");
    domHandling.displayElements(["#success-field", "#confirm-window"]);
    /// LLAMAR COMPONENTE PANTALLA INICIAL

    $UPLOADED_GIF.src = `${url}`;
    domHandling.setDownloadBtn(url);
    domHandling.toggleGrayscale();
    //PARTE DEL COMPONENTE INICIAL
    myGuifos.renderMyGuifos();
  },

  showErrorMsg: error => {
    const $ERROR_WINDOW = document.querySelector("#error-msg");
    const $ERROR_DESCRIPTION = document.querySelector("#error-description");
    const $ACCEPT_BUTTON = document.querySelector("#error-acept");
    $ERROR_WINDOW.className !== "hidden"
      ? ($ERROR_WINDOW.className = "hidden")
      : (($ERROR_WINDOW.className = "error-window"),
        ($ERROR_DESCRIPTION.textContent = error));
    $ACCEPT_BUTTON.onclick = () => {
      $ERROR_WINDOW.className = "hidden";
    };
  },

  toggleGrayscale: () => {
    const $CONTAINER = document.querySelector(".container");
    $CONTAINER.classList.toggle("grayscale");
  },

  handleWindowsTitle: title => {
    const $WINDOWS_TITLE = document.querySelector("#record-title");
    $WINDOWS_TITLE.textContent = title;
  },

  setDownloadBtn: url => {
    domHandling.downloadBtn.href = `${url}`;
  },

  setCopyLink: url => {
    const copyText = url;
    navigator.clipboard.writeText(copyText);
  },

  showCopyPopUp: () => {
    const popUp = document.querySelector("#copy-msg");
    popUp.className = "copy-popup";
    setTimeout(() => {
      popUp.className = "hidden";
    }, 1000);
  },

  goToMyGuifos: () => {
    //CAMBIAR
    domHandling.handleDisplayAttribute([
      "#gifs-suggested",
      "#search-section",
      "#back-arrow"
    ]);
    myGuifos.renderMyGuifos();
  },

  handlerEvents: () => {
    domHandling.themeBtn.onclick = () => {
      domHandling.openThemeSelector();
    };

    domHandling.dayBtn.onclick = () => {
      styleTheme.changeSheet(domHandling.dayBtn);
      domHandling.applyTheme(domHandling.dayBtn);
      domHandling.changeBtnStatus(domHandling.getUserInput());
    };

    domHandling.nightBtn.onclick = () => {
      styleTheme.changeSheet(domHandling.nightBtn);
      domHandling.applyTheme(domHandling.nightBtn);
      domHandling.changeBtnStatus(domHandling.getUserInput());
    };

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

    domHandling.createBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#create-gif-section",
        "#start-creating",
        "#gifs-suggested",
        "#search-section",
        "nav",
        "#back-arrow"
      ]);
      myGuifos.renderMyGuifos();
    };

    domHandling.startBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#start-creating",
        "#record-field",
        "#btn-capture",
        "#gifs-main-section"
      ]);
    };

    domHandling.cancelBtn.onclick = () => {
      domHandling.handleDisplayAttribute(["#start-creating"]);
    };

    domHandling.captureBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#record-control",
        "#btn-capture",
        "#btn-ready"
      ]);
      domHandling.handleWindowsTitle("Capturando Tu Guifo");
      createGif.startRecord();
    };

    domHandling.readyBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#capture-confirm",
        "#upload-btn-container",
        "#btn-ready"
      ]);
      domHandling.handleWindowsTitle("Vista Previa");
      createGif.stopRecord();
    };

    domHandling.playBtn.onclick = () => {
      createGif.userVideo.play();
      domHandling.showTimeBar();
    };

    domHandling.recaptureBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#btn-capture",
        "#record-control",
        "#capture-confirm",
        "#upload-btn-container"
      ]);
      domHandling.handleWindowsTitle("Un Chequeo Antes de Empezar");
      createGif.userVideo.src = null;
      createGif.showUserVideo();
    };

    domHandling.uploadBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#record-control",
        "#btn-ready",
        "#capture-confirm",
        "#upload-btn-container",
        "#loading-section",
        "#upload-abort",
        "video"
      ]);
      domHandling.handleWindowsTitle("Subiendo Guifo");
      createGif.userVideo.src = null;
      domHandling.animateLoadingBar();
      observer.subscribe(domHandling.showSuccessWindows);
      giphyApi.postGif();
    };

    domHandling.abortBtn.onclick = () => {
      giphyApi.abortController.abort();
    };

    domHandling.copyBtn.onclick = () => {
      $UPLOADED_GIF = document.querySelector("#final-guifo");
      domHandling.setCopyLink($UPLOADED_GIF.src);
      domHandling.showCopyPopUp();
    };

    domHandling.finishBtn.onclick = () => {
      domHandling.handleDisplayAttribute([
        "#record-field",
        "#start-creating",
        "#success-field",
        "#confirm-window"
      ]);
      domHandling.toggleGrayscale();
      observer.unsuscribe(domHandling.showSuccessWindows);
    };

    myGuifos.myGuifosBtn.onclick = () => {
      observer.notify();
      observer.unsuscribe(domHandling.goToMyGuifos);
    };
  }
};

const observer = {
  subscriptors: [],

  subscribe: subscriptor => {
    observer.subscriptors.push(subscriptor);
  },

  unsuscribe: subscriptor => {
    observer.subscriptors = observer.subscriptors.filter(
      item => item != subscriptor
    );
  },

  notify: event => {
    observer.subscriptors.forEach(item => {
      item.call(null, event);
    });
  }
};
