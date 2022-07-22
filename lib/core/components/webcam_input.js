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
    const video = super.createElement('video');
    video.autoplay = true;
    video.removeAttribute('controls');
    if (navigator.mediaDevices.getUserMedia) {
      this.setupWebcam(video);
    }
    return video;
  }

  getValue() {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    canvas.getContext('2d').drawImage(this.el, 0, 0, 200,200);
    return canvas.toDataURL();
  }
}