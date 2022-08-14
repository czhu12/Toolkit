kit.text("# Select your label");
const label = kit.radio("What is the image type?", ["Cat", "Dog"]);
kit.text("# Take a picture");
const image = kit.webcam("Take a photo");
if (kit.button("Take photo")) {
  kit.text(label);
}
