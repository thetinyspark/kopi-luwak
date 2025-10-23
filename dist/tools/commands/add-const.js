"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConst = void 0;
const fs = require("fs-extra");
const path = require("path");
async function addConst(eventName) {
    try {
        const configPath = path.resolve(process.cwd(), 'src/config/AppConsts.ts');
        // Ensure config directory exists
        await fs.ensureDir(path.dirname(configPath));
        // Format event name
        const formattedEventName = eventName.toUpperCase();
        const eventConstant = `export const ${formattedEventName} = "${formattedEventName}";\n`;
        // Check if file exists
        let content;
        try {
            content = await fs.readFile(configPath, 'utf-8');
        }
        catch {
            // If file doesn't exist, create with template
            const templatePath = path.resolve(__dirname, '../templates/v.ts.template');
            content = await fs.readFile(templatePath, 'utf-8');
        }
        // Add new event if it doesn't exist
        if (!content.includes(formattedEventName)) {
            // Find the last export statement
            const lastExportIndex = content.lastIndexOf('export const');
            if (lastExportIndex === -1) {
                // No exports yet, add after comments
                const commentEndIndex = content.indexOf('*/');
                if (commentEndIndex === -1) {
                    content = content + eventConstant;
                }
                else {
                    content = content.slice(0, commentEndIndex + 2) + '\\n\\n' + eventConstant + content.slice(commentEndIndex + 2);
                }
            }
            else {
                // Add after last export
                const insertIndex = content.indexOf(';', lastExportIndex) + 1;
                content = content.slice(0, insertIndex) + "\n" + eventConstant + content.slice(insertIndex);
            }
            // Write updated content
            await fs.writeFile(configPath, content);
            console.log(`Added constants ${formattedEventName}`);
        }
        else {
            console.log(`Constant ${formattedEventName} already exists`);
        }
    }
    catch (error) {
        console.error('Error adding constant:', error);
        process.exit(1);
    }
}
exports.addConst = addConst;
