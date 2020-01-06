const createGif = {
  createSection: document.querySelector("#create-gif-section"),
  startSection: document.querySelector("#start-creating"),
  recordSection: document.querySelector("#record-field"),
  createBtn: document.querySelector("#create-gif"),
  startBtn: document.querySelector("#start-preview"),
  cancelBtn: document.querySelector("#create-abort"),
  captureBtn: document.querySelector("#btn_capture"),
  playBtn: document.querySelector("#btn_play"),
  recaptureBtn: document.querySelector("#btn-recapture"),
  uploadBtn: document.querySelector("#btn-upload"),
  readyBtn: document.querySelector("#btn-ready"),
  userVideo: document.querySelector("video"),
  timeCounter: document.querySelector("#video-time"),

  getCurrentTime: () => {
    const video = createGif.userVideo;
    video.ontimeupdate = function() {
      seconds = video.currentTime;
      createGif.timeCounter.textContent = createGif.renderTime(seconds);
    };
  },

  showUserVideo: async () => {
    const video = createGif.userVideo;
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: {max: 480},
        width: {ideal: 860}
      }
    });
    video.srcObject = stream;
    video.play();
    createGif.getCurrentTime();
  },

  renderTime: seconds => {
    dateObj = new Date(seconds * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    return timeString;
  },

  recordVideo: () => {
    const recorder = new GifRecorder({
      onGifRecordingStarted: console.log("hola"),
      width: 1280,
      height: 720,
      frameRate: 200,
      quality: 10
    });

    recorder.record();
    recorder.stop(function(blob) {
      createGif.userVideo.src = blob;
    });
  },

  BtnHandler: () => {
    createGif.createBtn.onclick = () => {
      createGif.createSection.className = "create-gifos";
    };

    createGif.startBtn.onclick = () => {
      createGif.startSection.className = "hidden";
      createGif.recordSection.className = "create-gifos-record";
      createGif.showUserVideo();
    };

    createGif.cancelBtn.onclick = () => {
      //TODO ==> COMPLETAR PASOS PARA VOLVER PARA ATRAS!
      alert("COMPLETAR");
    };
  },

  init: () => {
    createGif.BtnHandler();
  }
};
