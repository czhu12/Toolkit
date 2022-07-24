import jszip from "https://cdn.skypack.dev/jszip";
bs.text("# Epub Bionic Reader")
const file = bs.fileInput("Upload your epub file", {as: "binary"});

if (bs.button("Generate")) {
    const unzipped = await jszip.loadAsync(file);
    console.log(Object.keys(unzipped.files));
    const files = Object.keys(unzipped.files).filter((f) => f.endsWith(".html"));
    for (let i = 0; i < files.length; i++) {
        const path = files[i];
        const text = await unzipped.files[path].async("text");
        console.log(text);
    }
}

