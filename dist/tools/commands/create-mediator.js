"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMediator = void 0;
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const add_const_1 = require("./add-const");
async function createMediator(name, eventKey) {
    try {
        // add token as app keys if not exists
        (0, add_const_1.addConst)(eventKey);
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Mediator`;
        const token = eventKey;
        // Read mediator template
        const templatePath = path.resolve(__dirname, '../templates/mediator.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        // Generate mediator file content
        const content = ejs.render(template, { className, token }, {});
        // Create mediators directory if it doesn't exist
        const mediatorsDir = path.resolve(process.cwd(), 'src/mediators');
        await fs.ensureDir(mediatorsDir);
        // Write mediator file
        const filePath = path.resolve(mediatorsDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        // Update main.ts to register the mediator
        await updateMainTs(className);
        console.log(`Created mediator ${className}`);
    }
    catch (error) {
        console.error('Error creating mediator:', error);
        process.exit(1);
    }
}
exports.createMediator = createMediator;
async function updateMainTs(className) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        // Add import for the mediator
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import "./mediators/${className}";\n`;
        const detectImport = `import "./mediators/${className}"`;
        if (!content.includes(detectImport)) {
            if (lastImport === -1) {
                content = importStatement + content;
            }
            else {
                const importEnd = content.indexOf('\n', lastImport) + 1;
                content = content.slice(0, importEnd) + importStatement + content.slice(importEnd);
            }
        }
        // Write updated content
        await fs.writeFile(mainPath, content);
    }
    catch (error) {
        console.error('Error updating main.ts:', error);
        throw error;
    }
}
