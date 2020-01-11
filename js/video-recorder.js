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
  stream: null,
  recorder: null,
  gifTime: null,

  getCurrentTime: () => {
    const video = createGif.userVideo;
    video.currentTime = 0;
    video.ontimeupdate = function() {
      const seconds = video.currentTime;
      createGif.gifTime = createGif.renderTime(seconds);
      createGif.timeCounter.textContent = createGif.gifTime;
    };
  },

  showUserVideo: async () => {
    const video = createGif.userVideo;
    createGif.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: {max: 480},
        width: {ideal: 860}
      }
    });
    video.srcObject = createGif.stream;
    video.play();
  },

  recordVideo: async () => {
    createGif.userVideo.load();
    createGif.userVideo.play();
    createGif.recorder = new RecordRTCPromisesHandler(createGif.stream, {
      type: "video"
    });
    await createGif.recorder.startRecording();
    createGif.recorder.stream = createGif.stream;
    createGif.getCurrentTime();
  },

  stopRecording: async () => {
    createGif.userVideo.srcObject = null;
    await createGif.recorder.stopRecording();
    let blob = await createGif.recorder.getBlob();
    createGif.userVideo.srcObject = null;
    createGif.userVideo.src = URL.createObjectURL(blob);
    createGif.recorder.stream.getTracks(t => t.stop());
    await createGif.recorder.reset();
    await createGif.recorder.destroy();
    createGif.recorder = null;
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
