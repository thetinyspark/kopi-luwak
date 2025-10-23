"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const add_const_1 = require("./add-const");
async function createCommand(name, eventKey) {
    try {
        // add token as app keys if not exists
        (0, add_const_1.addConst)(eventKey);
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Command`;
        const token = eventKey;
        // Read command template
        const templatePath = path.resolve(__dirname, '../templates/command.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        // Generate command file content
        const content = ejs.render(template, { className, token }, {});
        // Create commands directory if it doesn't exist
        const commandsDir = path.resolve(process.cwd(), 'src/commands');
        await fs.ensureDir(commandsDir);
        // Write command file
        const filePath = path.resolve(commandsDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        // Update main.ts to register the command
        await updateMainTs(className, eventKey);
        console.log(`Created command ${className} for event ${eventKey}`);
    }
    catch (error) {
        console.error('Error creating command:', error);
        process.exit(1);
    }
}
exports.createCommand = createCommand;
async function updateMainTs(className, eventKey) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        //detectors
        const detectImport = `import "./commands/${className}"`;
        if (content.indexOf(detectImport) === -1) {
            // Add import for the command
            const lastImport = content.lastIndexOf('import');
            const importStatement = `import "./commands/${className}";\n`;
            // const importStatement = `import { ${className} } from "./commands/${className}";\n`;
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
