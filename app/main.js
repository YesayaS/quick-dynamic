const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const axios = require("axios");

const flaskURL = "http://127.0.0.1:5000";

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  try {
    require("electron-reload")(module, {
      debug: true,
      watchRenderer: true,
    });
  } catch (_) {
    console.log("Error");
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // if (env === "development") win.webContents.openDevTools();
  // win.setMenu(null);
  win.loadURL(flaskURL);
};

app.whenReady().then(() => {
  handleAPI();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function handleAPI() {
  ipcMain.handle("dialog:openFolder", selectFolder);
  ipcMain.handle("rename:Folders", (event, data) => renameFolders(data));
}

async function selectFolder() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (!canceled) {
    return filePaths[0];
  }
}

async function renameFolders(data) {
  const resp = axios
    .post(flaskURL + "/rename", data)
    .then(function (response) {
      console.log("response : " + response.data["status"]);
      return response.data["status"];
    })
    .catch(function (error) {
      console.log(error);
      return "server error";
    });
  return resp;
}
