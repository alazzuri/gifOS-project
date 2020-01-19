const createGif = {
  userVideo: document.querySelector("video"),
  stream: null,
  recorder: null,
  gifStream: null,
  gifTime: null,
  blobFile: null,

  showUserVideo: async () => {
    const video = createGif.userVideo;
    createGif.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
        width: { ideal: 860 }
      }
    });
    video.srcObject = createGif.stream;
    video.play();
  },

  startRecord: async () => {
    createGif.userVideo.load();
    createGif.userVideo.play();
    // SE CREAA UN RECORDER FORMATO VIDEO PARA MOSTRAR EN EL TAG HTML Y UNO FORMATO GIF PARA HACER EL POST.
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
    domHandling.getCurrentTime();
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

  createFormData: () => {
    const form = new FormData();
    form.append("file", createGif.blobFile, "my-guifos.gif");
    createGif.blobFile = null;
    return form;
  },

  saveGif: url => {
    const newId = localStorage.length;
    localStorage.setItem(`my-guifos-${newId}`, url);
  }
};
