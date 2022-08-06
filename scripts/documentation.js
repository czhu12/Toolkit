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
##### HtmlItem
Render custom HTML.

\`\`\`
kit.iframe("This is custom HTML <a href="https://google.com">Click here to go to google</a>");
\`\`\`
`);

kit.iframe("This is custom HTML <a href='https://google.com'>Click here to go to google</a>");


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
kit.text("You entered: " + inputText);

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
kit.text("You entered: " + dateInput);

kit.text(`
##### Time Input
A date input element.

\`\`\`
const timeInput = kit.timeInput("Choose a time");
kit.text("You entered: " + timeInput);
\`\`\`
`);
const timeInput = kit.timeInput("Choose a time");
kit.text("You entered: " + timeInput);

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
kit.text("## Media Elements");
kit.text("## Status Elements");
