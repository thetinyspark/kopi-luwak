"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewProject = void 0;
const fs = require("fs-extra");
const path = require("path");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function createNewProject(projectName) {
    try {
        const projectPath = path.resolve(process.cwd(), projectName);
        // Create project directory
        await fs.ensureDir(projectPath);
        // Create base structure
        const structure = {
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
        await installDependencies(projectPath);
        await copyTemplates(projectPath);
        console.log(`Project ${projectName} created successfully!`);
        console.log('To get started:');
        console.log(`cd ${projectName}`);
        console.log('npm run dev');
    }
    catch (error) {
        console.error('Error creating project:', error);
        process.exit(1);
    }
}
exports.createNewProject = createNewProject;
async function createDirectoryStructure(basePath, structure) {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = path.join(basePath, name);
        await fs.ensureDir(fullPath);
        if (Object.keys(content).length > 0) {
            await createDirectoryStructure(fullPath, content);
        }
    }
}
async function copyTemplates(projectPath) {
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
async function createCommand(projectPath) {
    try {
        await execAsync('npx kopi create-command StartApp START_APP', { cwd: projectPath });
    }
    catch (error) {
        console.warn('Warning: Could not create StartAppCommand');
    }
}
async function createPackageJson(projectPath, projectName) {
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: 'A Kopi-luwak Application',
        main: 'dist/main.js',
        scripts: {
            dev: 'ts-node src/main.ts',
            build: 'tsc',
            test: 'jest'
        },
        dependencies: {
            '@thetinyspark/kopi-luwak': 'github:thetinyspark/kopi-luwak',
            '@thetinyspark/tiny-observer': '^1.0.0'
        },
        devDependencies: {
            '@types/jest': '^29.0.0',
            '@types/node': '^20.0.0',
            'jest': '^29.0.0',
            'ts-jest': '^29.0.0',
            'ts-node': '^10.0.0',
            'typescript': '^5.0.0'
        }
    };
    await fs.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
}
async function initGit(projectPath) {
    try {
        await execAsync('git init', { cwd: projectPath });
        // Create .gitignore
        const gitignore = `node_modules/
dist/
coverage/
.DS_Store
*.log`;
        await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
    }
    catch (error) {
        console.warn('Warning: Could not initialize git repository');
    }
}
async function installDependencies(projectPath) {
    console.log('Installing dependencies...');
    try {
        await execAsync('npm install', { cwd: projectPath });
    }
    catch (error) {
        console.error('Error installing dependencies:', error);
        throw error;
    }
}
