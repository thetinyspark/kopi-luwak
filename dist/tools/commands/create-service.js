"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = void 0;
const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const add_const_1 = require("./add-const");
async function createService(name, token) {
    try {
        // add token as app keys if not exists
        (0, add_const_1.addConst)(token);
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Service`;
        // Read service template
        const templatePath = path.resolve(__dirname, '../templates/service.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        // Generate service file content
        const content = ejs.render(template, { className, token }, {});
        // Create services directory if it doesn't exist
        const servicesDir = path.resolve(process.cwd(), 'src/services');
        await fs.ensureDir(servicesDir);
        // Write service file
        const filePath = path.resolve(servicesDir, `${className}.ts`);
        await fs.writeFile(filePath, content);
        // Update main.ts to register the service
        await updateMainTs(className);
        console.log(`Created service ${className}`);
    }
    catch (error) {
        console.error('Error creating service:', error);
        process.exit(1);
    }
}
exports.createService = createService;
async function updateMainTs(className) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        // Add import for the service
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import "./services/${className}";\n`;
        const detectImport = `import "./services/${className}"`;
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
