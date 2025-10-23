import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';
import { addConst } from './add-const'

export async function createProxy(name: string, eventKey:string) {
    try {
        // Convert name to PascalCase for class name
        const className = `${name.charAt(0).toUpperCase()}${name.slice(1)}Proxy`;
        const token = eventKey;

        // add token as app keys if not exists
        addConst(token);
        
        // Read proxy template
        const templatePath = path.resolve(__dirname, '../templates/proxy.ts.template');
        const template = await fs.readFile(templatePath, 'utf-8');
        
        // Generate proxy file content
        const content = ejs.render(template, { className, token }, {});
        
        // Create proxies directory if it doesn't exist
        const proxiesDir = path.resolve(process.cwd(), 'src/proxies');
        await fs.ensureDir(proxiesDir);
        
        // Write proxy file
        const filePath = path.resolve(proxiesDir, `${className}.ts`);
        await fs.writeFile(filePath, content);

        // Update main.ts to register the proxy
        await updateMainTs(className);
        
        console.log(`Created proxy ${className}`);
    } catch (error) {
        console.error('Error creating proxy:', error);
        process.exit(1);
    }
}

async function updateMainTs(className: string) {
    const mainPath = path.resolve(process.cwd(), 'src/main.ts');
    
    try {
        // Read main.ts
        let content = await fs.readFile(mainPath, 'utf-8');
        
        // Add import for the proxy
        const lastImport = content.lastIndexOf('import');
        const importStatement = `import "./proxies/${className}";\n`;
        const detectImport = `import "./proxies/${className}"`;

        if(!content.includes(detectImport)){
            if (lastImport === -1) {
                content = importStatement + content;
            } else {
                const importEnd = content.indexOf('\n', lastImport) + 1;
                content = content.slice(0, importEnd) + importStatement + content.slice(importEnd);
            }
        }
        
        // Write updated content
        await fs.writeFile(mainPath, content);
    } catch (error) {
        console.error('Error updating main.ts:', error);
        throw error;
    }
}