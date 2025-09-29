#!/usr/bin/env node
const { spawn } = require("child_process");
const { join } = require("path");

const exportDir = join(__dirname, "..", "exports");
const opener = process.platform === "win32" ? "explorer" : process.platform === "darwin" ? "open" : "xdg-open";

const child = spawn(opener, [exportDir], { stdio: "inherit" });
child.on("error", () => {
  console.log(`Impossible d’ouvrir automatiquement le dossier. Ouvrez-le manuellement : ${exportDir}`);
});
