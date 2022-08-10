# Welcome to Toolkit 🔥

Toolkit turns your scripts into full blown apps. Here's a little example of a basic markdown editor with a word counter app:
```
kit.text('# Word counter');
const myText = kit.textarea('Your text here');
kit.text(myText);
kit.alert(`Word count: <b>${myText.match(/\S+/g)?.length || 0}</b> | character count: <b>${myText.length}</b>`, {alertType: "info"});
```
And heres what you get:

![image](https://raw.githubusercontent.com/czhu12/Toolkit/main/public/images/readme/wordcounter.png)

Everything runs entirely in browser, so you can build, run, and share without ever worrying about deployments, or hosting.

# How does it work? 🧠
Toolkit re-runs the entire script every time inputs change, which allows you to build apps as simple as scripting.