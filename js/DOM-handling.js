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
    $THEME_SELECTOR.classList.toggle("themes-list");
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

  handleCreateSection: () => {
    const $CREATE_SECTION = document.querySelector("#create-gif-section");
    $CREATE_SECTION.className !== "hidden"
      ? ($CREATE_SECTION.className = "hidden")
      : ($CREATE_SECTION.className = "create-gifos");
  },

  handleStartWindows: () => {
    const $START_WINDOWS = document.querySelector("#start-creating");
    $START_WINDOWS.className !== "hidden"
      ? ($START_WINDOWS.className = "hidden")
      : ($START_WINDOWS.className = "create-gifos-start");
  },

  handleRecordField: () => {
    const $RECORD_SECTION = document.querySelector("#record-field");
    $RECORD_SECTION.className === "hidden"
      ? ($RECORD_SECTION.className = "create-gifos-record")
      : ($RECORD_SECTION.className = "hidden");
  },

  handleCkeckWindows: () => {
    if (domHandling.captureBtn.className === "hidden") {
      createGif.userVideo.style.display = "inline-block";
      domHandling.captureBtn.className = "double-btn";
      domHandling.handleWindowsTitle("Un Chequeo Antes de Empezar");
    } else {
      domHandling.captureBtn.className = "hidden";
    }
  },

  handleRecordWindows: () => {
    const $RECORD_CONTROL = document.querySelector("#record-control");
    if ($RECORD_CONTROL.className === "hidden") {
      $RECORD_CONTROL.className = "recording-section";
      domHandling.captureBtn.className = "hidden";
      domHandling.readyBtn.className = "double-btn";
      domHandling.handleWindowsTitle("Capturando Tu Guifo");
    } else {
      $RECORD_CONTROL.className = "hidden";
    }
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

  handlePreviewWindows: () => {
    const $CAPTURE_CONFIRM = document.querySelector("#capture-confirm");
    const $BUTTONS_CONTAINER = document.querySelector("#upload-btn-container");
    if ($CAPTURE_CONFIRM.className === "hidden") {
      $CAPTURE_CONFIRM.className = "capture-confirm";
      $BUTTONS_CONTAINER.className = "upload-gif-btn-container";
      domHandling.readyBtn.className = "hidden";
      domHandling.handleWindowsTitle("Vista Previa");
    } else {
      $CAPTURE_CONFIRM.className = "hidden";
    }
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

  handleUploadWindows: () => {
    const $LOADING_SECTION = document.querySelector("#loading-section");
    const $UPLOAD_ABORT = document.querySelector("#upload-abort");
    if ($LOADING_SECTION.className === "hidden") {
      createGif.userVideo.style.display = "none";
      $LOADING_SECTION.className = "loading-section";
      $UPLOAD_ABORT.classList.toggle("hidden");
      domHandling.handleWindowsTitle("Subiendo Guifo");
    } else {
      $LOADING_SECTION.className = "hidden";
      $UPLOAD_ABORT.classList.toggle("hidden");
    }
  },

  animateLoadingBar: () => {
    const loadingSquares = document.querySelectorAll(".loading-square");
    const barLenght = loadingSquares.length;
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
    const interval = setInterval(printSquare, 600);
    setTimeout(() => {
      clearInterval(interval);
      domHandling.showErrorMsg(
        "No se ha podido completar la carga. Intente nuevamente"
      );
    }, 30000);
  },

  showSuccessWindows: url => {
    const $CONFIRM_WINDOWS = document.querySelector("#confirm-window");
    const $RECORD_SECTION = document.querySelector("#record-field");
    $UPLOADED_GIF = document.querySelector("#final-guifo");
    $CONFIRM_WINDOWS.className = "upload-confirm";
    $UPLOADED_GIF.className = "uploaded-guifo";
    $UPLOADED_GIF.src = `${url}`;
    $RECORD_SECTION.className = "upload-success";
    createGif.userVideo.className = "hidden";
    domHandling.handleUploadWindows();
    domHandling.handleWindowsTitle("Guifo Subido Con Éxito");
    domHandling.setDownloadBtn(url);
    domHandling.handleGifsSection();
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

    domHandling.createBtn.onclick = () => {
      domHandling.handleCreateSection();
      domHandling.handleStartWindows();
      domHandling.handleSuggestedGifs();
      domHandling.handleSearchSection();
      domHandling.handleNavBar();
      domHandling.handleArrowBack();
      myGuifos.renderMyGuifos();
    };

    domHandling.startBtn.onclick = () => {
      domHandling.handleStartWindows();
      domHandling.handleRecordField();
      domHandling.handleCkeckWindows();
      createGif.showUserVideo();
      domHandling.handleGifsSection();
    };

    domHandling.cancelBtn.onclick = () => {
      domHandling.handleStartWindows();
    };

    domHandling.captureBtn.onclick = () => {
      domHandling.handleRecordWindows();
      createGif.startRecord();
    };

    domHandling.readyBtn.onclick = () => {
      domHandling.handlePreviewWindows();
      createGif.stopRecord();
    };

    domHandling.playBtn.onclick = () => {
      createGif.userVideo.play();
      domHandling.showTimeBar();
    };

    domHandling.recaptureBtn.onclick = () => {
      domHandling.handleCkeckWindows();
      domHandling.handleRecordWindows();
      domHandling.handlePreviewWindows();
      createGif.showUserVideo();
    };

    domHandling.uploadBtn.onclick = () => {
      domHandling.handleRecordWindows();
      domHandling.handlePreviewWindows();
      domHandling.handleUploadWindows();
      createGif.userVideo.src = null;
      domHandling.animateLoadingBar();
      giphyApi.postGif();
    };

    domHandling.abortBtn.onclick = () => {
      giphyApi.abortController.abort();
      domHandling.handleRecordField();
      domHandling.handleGifsSection();
      myGuifos.renderMyGuifos();
    };

    domHandling.copyBtn.onclick = () => {
      $UPLOADED_GIF = document.querySelector("#final-guifo");
      domHandling.setCopyLink($UPLOADED_GIF.src);
    };

    domHandling.finishBtn.onclick = () => {
      domHandling.handleRecordField();
    };

    myGuifos.myGuifosBtn.onclick = () => {
      myGuifos.renderMyGuifos();
      domHandling.handleSuggestedGifs();
      domHandling.handleSearchSection();
      domHandling.handleArrowBack();
    };
  }
};
