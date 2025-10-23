const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "./cli/templates");
const dest = path.join(__dirname, "../dist/tools/templates");

function copyRecursive(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // appel récursif pour les sous-dossiers
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(src, dest);
console.log("Templates copied to dist/tools/templates ✅");
