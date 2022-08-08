kit.text("## Display Elements");
kit.text(`
##### Text
Render markdown text.

\`\`\`
kit.text("**Hello**, *world*!");
\`\`\`
`);

kit.text("Hello, *world*!");

kit.text(`
##### Code
Render syntax highlighted code.

\`\`\`
kit.code("const a = 1;", {language: "javascript"});
\`\`\`
`);

kit.code("const a = 1;", {language: "javascript"});

kit.text(`
##### IFrame
Render iframe embed.

\`\`\`
kit.iframe("https://www.youtube.com/embed/dXBohfjc4WA");
\`\`\`
`);

kit.iframe("https://www.youtube.com/embed/dXBohfjc4WA");

kit.text(`
##### Html
Render custom HTML.

\`\`\`
kit.iframe("<a href='https://google.com'>Click here</a> to go to Toolkit");
\`\`\`
`);

kit.html("<a href='https://google.com'>Click here</a> to go to Toolkit");


kit.text("## Input Elements");

kit.text(`
##### Text Input
A string input element.

\`\`\`
const inputText = kit.input("Type in something!");
kit.text("You entered: " + inputText)
\`\`\`
`);
const inputText = kit.input("Type in something!");
kit.text("You entered: " + inputText, {key: "text-entered-1"});

kit.text(`
##### Text Area Input
A text area input

\`\`\`
const textAreaValue = kit.textarea("Write long stuff here")
kit.text("Your writing: " + textAreaValue);
\`\`\`
`);
const textAreaValue = kit.textarea("Write long stuff here")
kit.text("Your writing: " + textAreaValue);

kit.text(`
##### File Input
A file input element.

\`\`\`
const inputImage = kit.fileInput("Upload your file", {as: "image"});
if (inputImage) kit.image(inputImage);
\`\`\`
`);
const inputImage = kit.fileInput("Upload your file", {as: "image"});
if (inputImage) kit.image(inputImage);

kit.text(`
##### Date Input
A date input element.

\`\`\`
const dateInput = kit.dateInput("Choose a date");
kit.text("You entered: " + dateInput);
\`\`\`
`);
const dateInput = kit.dateInput("Choose a date");
kit.text("You entered: " + dateInput, {key: "text-entered-2"});

kit.text(`
##### Time Input
A date input element.

\`\`\`
const timeInput = kit.timeInput("Choose a time");
kit.text("You entered: " + timeInput);
\`\`\`
`);
const timeInput = kit.timeInput("Choose a time");
kit.text("You entered: " + timeInput, {key: "text-entered-3"});

kit.text(`
##### Button
A button element.

\`\`\`
const clicked = kit.button("Click me!");
if (clicked) {
  kit.text("Clicked!");
}
\`\`\`
`);
const clicked = kit.button("Click me!");
if (clicked) {
  kit.text("Clicked!");
}

kit.text(`
##### Slider
A slider element.

\`\`\`
const sliderValue = kit.slider("Slider");
kit.text("Slider value: " + slidervalue);
\`\`\`
`);
const sliderValue = kit.slider("Slider");
kit.text("Slider value: " + sliderValue);

kit.text(`
##### Radio
A list of radio elements.

\`\`\`
const radioValue = kit.radio("Where do you live?", ["Canada", "United States"]);
kit.text("Selected radio " + radioValue);
\`\`\`
`);
const radioValue = kit.radio("Where do you live?", ["Canada", "United States"]);
kit.text("Selected radio " + radioValue);

kit.text(`
##### Select
A select element.

\`\`\`
const selectedValue = kit.radio("Whats your favorite country?", ["Canada", "United States"]);
kit.text("Selected value " + selectedValue);
\`\`\`
`);
const selectedValue = kit.radio("Whats your favorite country?", ["Canada", "United States"]);
kit.text("Selected value " + selectedValue);

kit.text(`
##### Checkbox
A checkbox element.

\`\`\`
const checkboxValue = kit.checkbox("My fancy checkbox");
kit.text("Is checked: " + checkboxValue);
\`\`\`
`);
const checkboxValue = kit.checkbox("My fancy checkbox");
kit.text("Is checked: " + checkboxValue);

kit.text(`
##### Color Picker
A color picker element.

\`\`\`
const colorValue = kit.colorPicker("Pick a color!")
kit.text("Color selected: " + colorValue);
\`\`\`
`);
const colorValue = kit.colorPicker("Pick a color!")
kit.text("Color selected: " + colorValue);

kit.text(`
##### Download Button
A button that downloads data to users browser.

\`\`\`
kit.downloadButton("Download this image!")
\`\`\`
`);


kit.text("## Data Elements");
kit.text(`
##### Chart
A chart.js chart.

\`\`\`
const config = {
  type: 'line',
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [100, 10, 5, 2, 20, 30, 45],
    }]
  },
  options: {responsive: false}
};
kit.chart(config, {height: '400', width: '400'});
\`\`\`
`);
const config = {
  type: 'line',
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [100, 10, 5, 2, 20, 30, 45],
    }]
  },
  options: {responsive: false}
};
kit.chart(config, {height: '400', width: '400'});

kit.text(`
##### Data Table
An editable data table.

\`\`\`
const formattedData = kit.dataTable(
  [
    { field: "make", editable: true },
    { field: "model", editable: true },
    { field: "price", editable: true },
  ],
  [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ],
);
kit.text("The first car make is: " + formattedData[0].make);
\`\`\`
`);
const formattedData = kit.dataTable(
  [
    { field: "make", editable: true },
    { field: "model", editable: true },
    { field: "price", editable: true },
  ],
  [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ],
);
kit.text("The first car make is: " + formattedData[0].make);

kit.text("## Media Elements");
kit.text(`
##### Image
An image that can accept a network image or local file.

\`\`\`
kit.image("https://i.imgur.com/CAcnA3e.jpeg");
\`\`\`
`);

kit.image("https://i.imgur.com/CAcnA3e.jpeg", {width: '100', height: '100'});

kit.text(`
##### Audio
A network audio file.

\`\`\`
kit.audio("http://ringelkater.de/Sounds/2geraeusche_tiere/dino_tyrannosaurus1.wav");
\`\`\`
`);

kit.audio("http://ringelkater.de/Sounds/2geraeusche_tiere/dino_tyrannosaurus1.wav");

kit.text(`
##### Video
A network video file.

\`\`\`
kit.video("/examples/video.mp4");
\`\`\`
`);

kit.video("/examples/video.mp4");

kit.text(`
##### Webcam
A webcam stream.

\`\`\`
if (kit.button("Show webcam")) {
  const photo = kit.webcam();
  if (kit.button("Take photo")) {
    kit.image(photo);
  }
}
\`\`\`
`);

if (kit.button("Show webcam")) {
  const photo = kit.webcam();
  if (kit.button("Take photo")) {
    kit.image(photo);
  }
}

kit.text("## Notification Elements");

kit.text(`
##### Alert
Alert message

\`\`\`
kit.alert("This is an alert!", {alertType: "danger"});
kit.alert("Congrats, you're awesome", {alertType: "success"});
kit.alert("Put some interesting info here.", {alertType: "info"});
\`\`\`
`);
kit.alert("This is an alert!", {alertType: "danger"});
kit.alert("Congrats, you're awesome", {alertType: "success"});
kit.alert("Put some interesting info here.", {alertType: "info"});