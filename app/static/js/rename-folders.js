const directoryButton = document.getElementById("directory-button");
const convertButton = document.getElementById("convert");


directoryButton.addEventListener("click", async () => {
  const response = await window.api.selectFolder();
  if (response !== undefined) document.getElementById("directory-input").value = response;
});

convertButton.addEventListener("click", async () => {
  // const directoryPath = document.getElementById("directory-input").value;
  const directoryPath = "G:\\_dummyFolders"
  const nameFormat = document.getElementById("name-format").value;
  const data = {
    directoryPath: directoryPath,
    nameFormat: nameFormat || "{id}",
  };
  const response = await window.api.renameFolders(data);
  console.log(response);
});

function folderDirectory(response) {
  if (response.status === "ok") {
    document.getElementById("directory-input").value = response.dir;
  }
}

function renameFolder(response) {
  console.log(response);
}
