import "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
import "https://unpkg.com/jepub/dist/jepub.min.js";
import "https://cdn.jsdelivr.net/npm/ejs@3.1.8/ejs.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js";

function returnNumOfBoldedLetters(word) {
    if (word.length <= 1) {
        return 0;
    } else if (word.length === 2) {
        return 1;
    } else if (word.length === 3) {
        return 2;
    } else if (word.length > 6) {
        return 3;
    } else {
        return word.length - 2;
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
  
function bionicWord(word) {
    if (!isLetter(word[0])) {
        // Don't know what this word is
        return word;
    }
    const end = returnNumOfBoldedLetters(word)
    return "<b>" + word.substring(0, end) + "</b>" + word.substring(end, word.length);
}

function toBionicWords(paragraph) {
    const words = paragraph.innerHTML.split(" ")
    const bionics = words.map(w => bionicWord(w));
    paragraph.innerHTML = bionics.join(" ");
}

kit.text("# Epub Bionic Reader")
const file = kit.fileInput("Upload your epub file", {as: "binary"});


if (kit.button("Generate")) {
    const unzipped = await JSZip.loadAsync(file);
    const files = Object.keys(unzipped.files).filter((f) => f.endsWith("html"));
    console.log(files);
    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
        const path = files[i];
        console.log("parsing " + path);
        const text = await unzipped.files[path].async("text");
        const parser = new DOMParser();
        const parsed = parser.parseFromString(text, 'text/html')
        const paragraphs = parsed.getElementsByTagName("p");
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            toBionicWords(paragraph)
        }
        zip.file(path, parsed.body.innerHTML);
    }
    const jepub = new jEpub()

    jepub.init({
        i18n: 'en', // Internationalization
        title: 'Book title',
        author: 'Book author',
        publisher: 'Book publisher',
        description: '<b>Book</b> description', // optional
        tags: [ 'epub', 'tag' ] // optional
    })
    const blob = await jepub.generate('blob');
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');

    document.body.appendChild(link);
    link.href = url;
    link.textContent = 'Download EPUB';
    link.download = 'lorem-ipsum.epub';
}
