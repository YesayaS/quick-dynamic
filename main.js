const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
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

  win.loadFile("./renderer/rename-folders.html");
  win.maximize();
  if (env === "development") win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const DUMMYFOLDER = "G:/_dummyFolders";
const folders = ["col 2", "col b", "col 3", "col 4"];
ipcMain.on("convert", () => {
  //TODO 1: remove all folder in directory

  //TODO 2: create messed folder name

  //TODO 3: rename all folder
  folders.forEach((folder) => {
    fs.mkdir(path.join(DUMMYFOLDER, folder), () => {});
  });
});
