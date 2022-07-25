import jspdf from "https://cdn.skypack.dev/jspdf";

tool.text("# Convert your image to a PDF");
const image = tool.fileInput("Upload your file");
if (tool.button("Generate")) {
  const doc = new jspdf();
  doc.addImage(image, "png", 0, 0, 200, 150);
  doc.save("image.pdf");
}
