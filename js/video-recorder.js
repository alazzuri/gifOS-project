const createGif = {
  createSection: document.querySelector("#create-gif-section"),
  startSection: document.querySelector("#start-creating"),
  recordSection: document.querySelector("#record-field"),
  recordControl: document.querySelector("#record-control"),
  recordSectionTitle: document.querySelector("#record-title"),
  createBtn: document.querySelector("#create-gif"),
  startBtn: document.querySelector("#start-preview"),
  cancelBtn: document.querySelector("#create-abort"),
  captureBtn: document.querySelector("#btn-capture"),
  playBtn: document.querySelector("#btn-play"),
  captureConfirm: document.querySelector("#capture-confirm"),
  readyBtn: document.querySelector("#btn-ready"),
  recaptureBtn: document.querySelector("#btn-recapture"),
  uploadBtn: document.querySelector("#btn-upload"),
  uploadAbort: document.querySelector("#upload-abort"),
  abortBtn: document.querySelector("#btn-abort"),
  myGuifosBtn: document.querySelector("#my-guifos-tag"),
  userVideo: document.querySelector("video"),
  timeCounter: document.querySelector("#video-time"),
  loadingSection: document.querySelector("#loading-section"),
  confirmWindow: document.querySelector("#confirm-window"),
  uploadedGif: document.querySelector("#final-guifo"),
  downloadBtn: document.querySelector("#download-btn"),
  copyBtn: document.querySelector("#copy-btn"),
  finishBtn: document.querySelector("#finish-btn"),
  stream: null,
  recorder: null,
  gifStream: null,
  gifTime: null,
  blobFile: null,
  abortController: new AbortController(),

  getCurrentTime: () => {
    const video = createGif.userVideo;
    video.currentTime = 0;
    video.ontimeupdate = () => {
      createGif.gifTime = video.currentTime;
      createGif.timeCounter.textContent = createGif.renderTime(
        createGif.gifTime
      );
    };
  },

  showUserVideo: async () => {
    const video = createGif.userVideo;
    createGif.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: { ideal: 480 },
        width: { ideal: 860 }
      }
    });
    video.srcObject = createGif.stream;
    video.play();
  },

  startRecord: async () => {
    createGif.userVideo.load();
    createGif.userVideo.play();
    // SE CREAN UN RECORDER FORMATO VIDEO PARA MOSTRAR EN EL TAG HTML Y UNO FORMATO GIF PARA HACER EL POST.
    // SI SE ENVIA EL FORMATO VIDEO A GIPHY DEVUELVE ERROR EL POST.
    createGif.recorder = new RecordRTCPromisesHandler(createGif.stream, {
      type: "video"
    });
    createGif.gifStream = new RecordRTCPromisesHandler(createGif.stream, {
      type: "gif"
    });
    await createGif.recorder.startRecording();
    await createGif.gifStream.startRecording();
    createGif.recorder.stream = createGif.stream;
    createGif.gifStream.stream = createGif.stream;
    createGif.getCurrentTime();
  },

  stopRecord: async () => {
    createGif.userVideo.srcObject = null;
    await createGif.recorder.stopRecording();
    await createGif.gifStream.stopRecording();
    const videoBlob = await createGif.recorder.getBlob();
    const gifBlob = await createGif.gifStream.getBlob();
    createGif.blobFile = gifBlob;
    createGif.userVideo.src = URL.createObjectURL(videoBlob);
    createGif.stream.getTracks().forEach(track => {
      track.stop();
    });
    await createGif.recorder.reset();
    await createGif.gifStream.reset();
    await createGif.recorder.destroy();
    await createGif.gifStream.destroy();
    createGif.recorder = null;
    createGif.gifStream = null;
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

  showProgressBar: () => {
    const timeSquares = document.querySelectorAll(".time-square");
    const totalTime = createGif.gifTime;
    const timePerSquare = +totalTime / (timeSquares.length - 1);
    let counter = 0;
    const resetBar = () => {
      timeSquares.forEach(element => element.classList.remove("square-pink"));
    };

    resetBar();

    createGif.userVideo.ontimeupdate = () => {
      const elapsedTime = createGif.userVideo.currentTime;
      createGif.timeCounter.textContent = createGif.renderTime(elapsedTime);
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
        setTimeout(() => {
          clearInterval(interval);
          //TODO = AGREGAR MENSAJE DE ERROR
        }, 30000);
      }
    };
    const interval = setInterval(printSquare, 100);
  },

  createFormData: () => {
    const form = new FormData();
    form.append("file", createGif.blobFile, "my-guifos.gif");
    createGif.blobFile = null;
    return form;
  },

  postGif: async () => {
    const API_ENDPOINT = "https://upload.giphy.com/v1/gifs?";
    const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx"; // ESTO TIENE QUE SER GLOBAL PORQUE SE USA PARA TODO.
    const heading = new Headers();
    const uploadFile = createGif.createFormData();
    const response = await fetch(API_ENDPOINT + "api_key=" + API_KEY, {
      method: "POST",
      headers: heading,
      body: uploadFile,
      cors: "no-cors",
      signal: createGif.abortController.signal
    });
    const json = await response.json();
    const gifId = json.data.id;
    // OBTENEMOS EL GIF PARA MANDARLO A LOCAL STORAGE.
    createGif.getUploadedGif(gifId);
  },

  getUploadedGif: async id => {
    const API_ENDPOINT = `https://api.giphy.com/v1/gifs/${id}?`;
    const API_KEY = "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx";
    const response = await fetch(API_ENDPOINT + "&api_key=" + API_KEY);
    const json = await response.json();
    const gifUrl = await json.data.images.original.url;
    //MANDAMOS EL GIF A LOCAL STORAGE
    createGif.saveGif(gifUrl);
    //MOSTRAMOS VENTADA DE CONFIRMACION
    createGif.showSuccessWindows(gifUrl);
  },

  saveGif: url => {
    const newId = localStorage.length;
    localStorage.setItem(`my-guifos-${newId}`, url);
  },

  showSuccessWindows: url => {
    createGif.recordSectionTitle.textContent = "Guifo Subido Con Éxito";
    createGif.userVideo.className = "hidden";
    createGif.uploadAbort.className = "hidden";
    createGif.uploadedGif.className = "uploaded-guifo";
    createGif.uploadedGif.src = `${url}`;
    createGif.confirmWindow.className = "upload-confirm";
    createGif.recordSection.className = "upload-success";
    createGif.loadingSection.className = "hidden";
    createGif.setDownloadBtn(url);
    handleGifsSection();
    createGif.renderMyGuifos();
  },

  setDownloadBtn: url => {
    createGif.downloadBtn.href = `${url}`;
  },

  setCopyLink: url => {
    const copyText = url;
    navigator.clipboard.writeText(copyText);
  },

  renderMyGuifos: () => {
    const $CONTAINER_TITLE = document.querySelector("#gif-container-title");
    const totalGuifos = localStorage.length;
    cleanSearchHistory();
    $CONTAINER_TITLE.textContent = "My Guifos";
    for (let i = 0; i < totalGuifos; i++) {
      const gifUrl = localStorage.getItem(`my-guifos-${i}`);
      printGifs(gifUrl, i);
    }
  },

  BtnHandler: () => {
    createGif.createBtn.onclick = () => {
      createGif.createSection.className = "create-gifos";
      createGif.startSection.className = "create-gifos-start";
      hideSuggestedGifs();
      hideSearcSection();
      hideNavBar();
      handleArrowBack();
      createGif.renderMyGuifos();
    };

    createGif.startBtn.onclick = () => {
      createGif.recordSectionTitle.textContent = "Un Chequeo Antes de Empezar";
      createGif.startSection.className = "hidden";
      createGif.recordSection.className = "create-gifos-record";
      createGif.userVideo.style.display = "inline-block";
      createGif.captureBtn.className = "double-btn";
      createGif.uploadedGif.className = "hidden";
      createGif.showUserVideo();
      handleGifsSection();
    };

    createGif.cancelBtn.onclick = () => {
      createGif.startSection.className = "hidden";
    };

    createGif.captureBtn.onclick = () => {
      createGif.recordSectionTitle.textContent = "Capturando Tu Guifo";
      createGif.captureBtn.className = "hidden";
      createGif.recordControl.className = "recording-section";
      createGif.readyBtn.className = "double-btn";
      createGif.startRecord();
    };

    createGif.readyBtn.onclick = () => {
      createGif.recordSectionTitle.textContent = "Vista Previa";
      createGif.readyBtn.className = "hidden";
      createGif.captureConfirm.className = "capture-confirm";
      createGif.stopRecord();
    };

    createGif.playBtn.onclick = () => {
      createGif.userVideo.play();
      createGif.showProgressBar();
    };

    createGif.recaptureBtn.onclick = () => {
      createGif.recordSectionTitle.textContent = "Un Chequeo Antes de Empezar";
      createGif.recordControl.className = "hidden";
      createGif.captureBtn.className = "double-btn";
      createGif.captureConfirm.className = "hidden";
      createGif.showUserVideo();
    };

    createGif.uploadBtn.onclick = () => {
      createGif.recordSectionTitle.textContent = "Subiendo Guifo";
      createGif.recordControl.className = "hidden";
      createGif.captureConfirm.className = "hidden";
      createGif.userVideo.style.display = "none";
      createGif.loadingSection.className = "loading-section";
      createGif.uploadAbort.classList.toggle("hidden");
      createGif.userVideo.src = null;
      createGif.animateLoadingBar();
      createGif.postGif();
    };

    createGif.copyBtn.onclick = () => {
      createGif.setCopyLink(createGif.uploadedGif.src);
    };

    createGif.finishBtn.onclick = () => {
      createGif.confirmWindow.className = "hidden";
      createGif.recordSection.className = "hidden";
    };

    createGif.myGuifosBtn.onclick = () => {
      createGif.renderMyGuifos();
      hideSuggestedGifs();
      hideSearcSection();
      handleArrowBack();
    };

    createGif.abortBtn.onclick = () => {
      createGif.abortController.abort();
      createGif.recordSection.className = "hidden";
      handleGifsSection();
      createGif.renderMyGuifos();
    };
  },

  init: () => {
    createGif.BtnHandler();
  }
};
