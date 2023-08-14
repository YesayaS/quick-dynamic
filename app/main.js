const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const axios = require('axios');

const env = process.env.NODE_ENV || "development";

const flaskURL = "http://127.0.0.1:5000";

if (env === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
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

  var flask = spawn("python", [path.join(__dirname, "server.py")]);
  flask.stdout.on("data", function (data) {
    console.log("data: ", data.toString("utf8"));
  });
  flask.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`); // when error
  });

  if (env === "development") win.webContents.openDevTools();

  win.loadURL(flaskURL);
  win.maximize();
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
  ipcMain.handle("renameFolders", (event, data) => renameFolders(data));
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
}
