import VideoItem from "./video";

export default class WebcamInput extends VideoItem {
  constructor(options={}) {
    super(options);
  }

  setupWebcam(video) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
  }

  createElement() {
    const video = super.createElement();
    video.autoplay = true;
    if (navigator.mediaDevices.getUserMedia) {
      this.setupWebcam(element);
    }
    return video;
  }
}