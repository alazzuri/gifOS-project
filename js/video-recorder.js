const $START_BUTTON = document.querySelector("#start-preview");

const showUserVideo = async () => {
  const video = document.querySelector("video");
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: {max: 480},
      width: {ideal: 860}
    }
  });
  video.srcObject = stream;
  video.play();
};

$START_BUTTON.onclick = () => {
  showUserVideo();
};
