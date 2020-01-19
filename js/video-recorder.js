const createGif = {
  userVideo: document.querySelector("video"),
  stream: null,
  recorder: null,
  gifStream: null,
  gifTime: null,
  blobFile: null,
  abortController: new AbortController(),

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

  postGif: async () => {
    const API_ENDPOINT = "https://upload.giphy.com/v1/gifs?";
    const API_KEY = giphyApi.apiKey;
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
    const API_KEY = giphyApi.apiKey;
    const response = await fetch(API_ENDPOINT + "&api_key=" + API_KEY);
    const json = await response.json();
    const gifUrl = await json.data.images.original.url;
    //MANDAMOS EL GIF A LOCAL STORAGE
    createGif.saveGif(gifUrl);
    //MOSTRAMOS VENTADA DE CONFIRMACION
    domHandling.showSuccessWindows(gifUrl);
  },

  saveGif: url => {
    const newId = localStorage.length;
    localStorage.setItem(`my-guifos-${newId}`, url);
  }
};
