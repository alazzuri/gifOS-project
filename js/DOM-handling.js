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
  loadingInterval: null,
  copyBtn: document.querySelector("#copy-btn"),
  finishBtn: document.querySelector("#finish-btn"),
  abortBtn: document.querySelector("#btn-abort"),
  downloadBtn: document.querySelector("#download-btn"),

  checkDevice: () => {
    const userAgent = navigator.userAgent;
    const mobileDevices = ["iPhone", "iPad", "iPod", "Android"];
    let response = null;
    mobileDevices.forEach(item => {
      userAgent.includes(item) ? (response = true) : false;
    });
    return response;
  },

  openThemeSelector: () => {
    const $THEME_SELECTOR = document.querySelector("#theme-list");
    $THEME_SELECTOR.classList.toggle("hidden");
    if (!$THEME_SELECTOR.className.includes("hidden")) {
      window.onclick = e => {
        !e.target.closest(".theme-selector")
          ? (domHandling.openThemeSelector(),
            observer.unsubscribe([styleTheme.changeSheet]),
            observer.unsubscribe([domHandling.applyTheme]))
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
    const $CAMERA_IMG = document.querySelector("#camera-img");
    const $ARROW_BACK = document.querySelector("#back-arrow");
    if (selectedTheme.className.includes("theme-day")) {
      $S_SPAN_DAY.className = "underlined";
      $S_SPAN_NIGHT.classList.remove("underlined");
      $GIFOS_LOGO.src = "./assets/gifOF_logo.png";
      $CAMERA_IMG.src = "./assets/camera.svg/";
      $ARROW_BACK.src = "./assets/arrow.svg";
    } else if (selectedTheme.className.includes("theme-night")) {
      $S_SPAN_NIGHT.className = "underlined";
      $S_SPAN_DAY.classList.remove("underlined");
      $GIFOS_LOGO.src = "./assets/gifOF_logo_dark.png";
      $CAMERA_IMG.src = "./assets/camera_light.svg";
      $ARROW_BACK.src = "./assets/arrow_white.svg";
    }
    domHandling.changeBtnStatus(domHandling.getUserInput());
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
    const removeSquares = () => {
      loadingSquares.forEach(element => {
        element.classList.remove("square-pink");
      });
    };
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
    clearInterval(domHandling.loadingInterval);
    removeSquares();
    const interval = setInterval(printSquare, 800);
    domHandling.loadingInterval = interval;
  },

  startCreatingGif: () => {
    domHandling.displayElements([
      "#back-arrow",
      "#create-gif-section",
      "#start-creating",
      "#gifs-main-section"
    ]);
    domHandling.hideElements([
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#record-field",
      "#success-field"
    ]);
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
    createGif.stopRecord();
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
    observer.subscribe([domHandling.showSuccessWindows]);
    observer.unsubscribe([domHandling.uploadGif]);
    giphyApi.postGif();
  },

  showSuccessWindows: url => {
    const $UPLOADED_GIF = document.querySelector("#final-guifo");
    domHandling.displayElements(["#success-field", "#confirm-window"]);
    $UPLOADED_GIF.src = `${url}`;
    domHandling.setDownloadBtn(url);
    domHandling.toggleGrayscale();
    observer.unsubscribe([domHandling.showSuccessWindows]);
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
    domHandling.displayElements([
      "#gifs-main-section",
      "#search-section",
      "#back-arrow"
    ]);
    domHandling.hideElements([
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#record-field",
      "#create-gif-section"
    ]);
    myGuifos.renderMyGuifos();
  },

  goHome: () => {
    domHandling.displayElements([
      "nav",
      "#search-section",
      "#gifs-suggested",
      "#gifs-main-section",
      "#search-section"
    ]);
    domHandling.hideElements([
      "#back-arrow",
      "#record-field",
      "#create-gif-section"
    ]);
    domHandling.resultsTitle.textContent = "Tendencias";
    suggestedGifs.printSuggestedGifs();
    renderGifs.getTrendingGifs();
  },

  handlerEvents: () => {
    domHandling.themeBtn.onclick = () => {
      observer.subscribe([domHandling.openThemeSelector]);
      observer.notify();
      observer.unsubscribe([domHandling.openThemeSelector]);
    };

    domHandling.dayBtn.onclick = () => {
      observer.subscribe([styleTheme.changeSheet, domHandling.applyTheme]);
      observer.notify(domHandling.dayBtn);
      observer.unsubscribe([styleTheme.changeSheet, domHandling.applyTheme]);
    };

    domHandling.nightBtn.onclick = () => {
      observer.subscribe([styleTheme.changeSheet, domHandling.applyTheme]);
      observer.notify(domHandling.nightBtn);
      observer.unsubscribe([styleTheme.changeSheet, domHandling.applyTheme]);
    };

    domHandling.searchbar.oninput = () => {
      observer.unsubscribe([domHandling.openThemeSelector]);
      observer.subscribe([domHandling.changeBtnStatus]);
      observer.notify(domHandling.getUserInput());
      observer.unsubscribe([domHandling.changeBtnStatus]);
    };

    domHandling.searchForm.onsubmit = event => {
      observer.unsubscribe([domHandling.openThemeSelector]);
      observer.subscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      observer.notify(domHandling.getUserInput());
      renderGifs.renderResultGifs(
        giphyApi.searchEndpoint,
        `?q=${domHandling.getUserInput()}`
      );
      observer.unsubscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      observer.subscribe([domHandling.changeBtnStatus]);
      observer.notify(domHandling.getUserInput);
      event.preventDefault();
    };

    domHandling.suggestedResult1.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult1.textContent;
      observer.subscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      observer.notify(BUTTONTEXT);
      observer.unsubscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
      observer.subscribe([domHandling.changeBtnStatus]);
      observer.notify(domHandling.getUserInput);
    };

    domHandling.suggestedResult2.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult2.textContent;
      observer.subscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      observer.notify(BUTTONTEXT);
      observer.unsubscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
      observer.subscribe([domHandling.changeBtnStatus]);
      observer.notify(domHandling.getUserInput);
    };

    domHandling.suggestedResult3.onclick = () => {
      const BUTTONTEXT = domHandling.suggestedResult3.textContent;
      observer.subscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      observer.notify(BUTTONTEXT);
      observer.unsubscribe([
        renderGifs.cleanRenderedGifs,
        domHandling.removeRelatedButtons,
        domHandling.printSearchTitle
      ]);
      renderGifs.renderResultGifs(giphyApi.searchEndpoint, `?q=${BUTTONTEXT}`);
      observer.subscribe([domHandling.changeBtnStatus]);
      observer.notify(domHandling.getUserInput);
    };

    domHandling.createBtn.onclick = () => {
      domHandling.checkDevice()
        ? domHandling.showErrorMsg(
            "Funcionalidad no compatible con dispositivos móviles"
          )
        : (observer.subscribe([domHandling.startCreatingGif]),
          observer.notify(),
          observer.unsubscribe([domHandling.startCreatingGif]));
    };

    domHandling.startBtn.onclick = () => {
      observer.subscribe([domHandling.checkVideo]);
      observer.notify();
      observer.unsubscribe([domHandling.checkVideo]);
    };

    domHandling.cancelBtn.onclick = () => {
      observer.subscribe([domHandling.goHome]);
      observer.notify();
      observer.unsubscribe([domHandling.goHome]);
    };

    domHandling.captureBtn.onclick = () => {
      observer.subscribe([domHandling.captureGif]);
      observer.notify();
      observer.unsubscribe([domHandling.captureGif]);
    };

    domHandling.readyBtn.onclick = () => {
      observer.subscribe([domHandling.showPreview]);
      observer.notify();
      observer.unsubscribe([domHandling.showPreview]);
    };

    domHandling.playBtn.onclick = () => {
      createGif.userVideo.play();
      domHandling.showTimeBar();
    };

    domHandling.recaptureBtn.onclick = () => {
      observer.subscribe([domHandling.startCreatingGif]);
      observer.notify();
      observer.unsubscribe([domHandling.startCreatingGif]);
      createGif.userVideo.src = null;
    };

    domHandling.uploadBtn.onclick = () => {
      observer.subscribe([domHandling.uploadGif]);
      observer.notify();
      createGif.userVideo.src = null;
    };

    domHandling.abortBtn.onclick = () => {
      giphyApi.abortController.abort();
    };

    domHandling.copyBtn.onclick = () => {
      $UPLOADED_GIF = document.querySelector("#final-guifo");
      observer.unsubscribe([domHandling.showSuccessWindows]);
      observer.subscribe([domHandling.setCopyLink, domHandling.showCopyPopUp]);
      observer.notify($UPLOADED_GIF.src);
      observer.unsubscribe([
        domHandling.setCopyLink,
        domHandling.showCopyPopUp
      ]);
    };

    domHandling.finishBtn.onclick = () => {
      observer.subscribe([domHandling.startCreatingGif]);
      domHandling.toggleGrayscale();
      observer.notify();
    };

    myGuifos.myGuifosBtn.onclick = () => {
      observer.subscribe([domHandling.goToMyGuifos]);
      observer.notify();
      observer.unsubscribe([domHandling.goToMyGuifos]);
    };
  }
};

const observer = {
  subscriptors: [],

  subscribe: subscriptor => {
    subscriptor.forEach(item => {
      observer.subscriptors.push(item);
    });
  },

  unsubscribe: subscriptor => {
    subscriptor.forEach(element => {
      observer.subscriptors = observer.subscriptors.filter(
        item => item !== element
      );
    });
  },

  notify: event => {
    observer.subscriptors.forEach(item => {
      item.call(null, event);
    });
  }
};
