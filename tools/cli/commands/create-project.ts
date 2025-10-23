import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface DirectoryStructure {
    [key: string]: DirectoryStructure | Record<string, never>;
}

export async function createNewProject(projectName: string) {
    try {
        const projectPath = path.resolve(process.cwd(), projectName);
        
        // Create project directory
        await fs.ensureDir(projectPath);
        
        // Create base structure
        const structure: DirectoryStructure = {
            'src': {
                'commands': {},
                'config': {},
                'mediators': {},
                'models': {},
                'proxies': {},
                'stores': {},
                'services': {},
            },
            'test': {
                'commands': {},
                'mediators': {},
                'models': {},
                'proxies': {},
                'stores': {},
                'services': {},
            }
        };

        await createDirectoryStructure(projectPath, structure);
        await createPackageJson(projectPath, projectName);
        await initGit(projectPath);
        await copyTemplates(projectPath);
        
        console.log(`Project ${projectName} created successfully!`);
        console.log('To get started:');
        console.log(`cd ${projectName}`);
        console.log('npm install');
        console.log('npm run dev');
    } catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}

async function createDirectoryStructure(basePath: string, structure: DirectoryStructure) {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = path.join(basePath, name);
        await fs.ensureDir(fullPath);
        
        if (Object.keys(content).length > 0) {
            await createDirectoryStructure(fullPath, content);
        }
    }
}

async function copyTemplates(projectPath: string) {
    // Copy bootstrap templates
    const eventsTemplate = path.resolve(__dirname, '../templates/bootstrap/AppConsts.ts.template');
    const eventsDestination = path.join(projectPath, 'src/config/AppConsts.ts');

    const mainTemplate = path.resolve(__dirname, '../templates/bootstrap/main.ts.template');
    const mainDestination = path.join(projectPath, 'src/main.ts');

    const readmeTemplate = path.resolve(__dirname, '../templates/bootstrap/README.ts.template');
    const readmeDestination = path.join(projectPath, 'src/README.md');

    const commandTemplate = path.resolve(__dirname, '../templates/bootstrap/StartAppCommand.ts.template');
    const commandDestination = path.join(projectPath, 'src/commands/StartAppCommand.ts');

    await fs.copy(eventsTemplate, eventsDestination);
    await fs.copy(mainTemplate, mainDestination);
    await fs.copy(readmeTemplate, readmeDestination);
    await fs.copy(commandTemplate, commandDestination);
}

async function createPackageJson(projectPath: string, projectName: string) {
    const templatePath = path.resolve(__dirname, '../templates/bootstrap/package.json.template');
    const template =  await fs.readFile(templatePath, 'utf-8');
    const destPath = path.join(projectPath, 'package.json');
    const output = ejs.render(template, {projectName}, {});
    
    // JSON.stringify(packageJson, null, 2)
    await fs.writeFile(destPath, output);
}

async function initGit(projectPath: string) {
    try {
        await execAsync('git init', { cwd: projectPath });
        
        // Create .gitignore
        const gitignore = `node_modules/
dist/
coverage/
.DS_Store
*.log`;
        
        await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
    } catch (error) {
        console.warn('Warning: Could not initialize git repository');
    }
}