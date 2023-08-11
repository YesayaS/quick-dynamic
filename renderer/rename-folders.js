const { PythonShell } = require("python-shell");
const convert = document.getElementById("convert");

convert.addEventListener("click", () => {
  console.log("send!");
  // window.electronAPI.convert("createFolder");
  let data = "hello there!";
  let pyshell = new PythonShell("rename-folders.js");
  pyshell.send(data);
  pyshell.on("message", function (message) {
    console.log(message + " HI");
  });
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log(code + " " + signal);
  });
});
