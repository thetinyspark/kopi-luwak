const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "./cli/templates");
const dest = path.join(__dirname, "../dist/tools/templates");

fs.mkdirSync(dest, { recursive: true });

fs.readdirSync(src).forEach(file => {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
});

console.log("Templates copied to dist/tools/templates ✅");
