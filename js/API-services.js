const giphyApi = {
  searchEndpoint: "https://api.giphy.com/v1/gifs/search",
  trendEndpoint: "https://api.giphy.com/v1/gifs/trending",
  uploadEndpoint: "https://upload.giphy.com/v1/gifs?",
  apiKey: "eiVo3MScNwrZJfkUOIP0WHzIV8uOQesx",
  idEndpoint: "https://api.giphy.com/v1/gifs/",
  abortController: null,

  getSearchResults: (url, requestType, limit = 20) => {
    const API_KEY = giphyApi.apiKey;
    const found = fetch(
      url + requestType + "&api_key=" + API_KEY + "&limit=" + limit
    ).then(response => {
      return response.json();
    });
    return found;
  },

  postGif: async () => {
    giphyApi.abortController = new AbortController();
    try {
      const API_ENDPOINT = giphyApi.uploadEndpoint;
      const API_KEY = giphyApi.apiKey;
      const heading = new Headers();
      const uploadFile = createGif.createFormData();
      const response = await fetch(API_ENDPOINT + "api_key=" + API_KEY, {
        method: "POST",
        headers: heading,
        body: uploadFile,
        cors: "no-cors",
        signal: giphyApi.abortController.signal
      });
      const json = await response.json();
      const gifId = json.data.id;
      giphyApi.getUploadedGif(gifId);
    } catch (error) {
      domHandling.showErrorMsg(error);
      domHandling.handleDisplayAttribute([
        "#loading-section",
        "#record-field",
        "#upload-abort",
        "#start-creating",
        "#gifs-main-section"
      ]);
      myGuifos.renderMyGuifos();
    }
  },

  getUploadedGif: async id => {
    const API_ENDPOINT = giphyApi.idEndpoint + id + "?";
    const API_KEY = giphyApi.apiKey;
    const response = await fetch(API_ENDPOINT + "&api_key=" + API_KEY);
    const json = await response.json();
    const gifUrl = await json.data.images.original.url;
    createGif.saveGif(gifUrl);
    observer.notify(gifUrl);
    // domHandling.handleSuccessWindows(gifUrl);
  }
};
