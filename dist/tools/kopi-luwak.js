#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_project_1 = require("./commands/create-project");
const add_const_1 = require("./commands/add-const");
const create_command_1 = require("./commands/create-command");
const create_mediator_1 = require("./commands/create-mediator");
const create_proxy_1 = require("./commands/create-proxy");
const create_service_1 = require("./commands/create-service");
const create_model_1 = require("./commands/create-model");
const create_store_model_1 = require("./commands/create-store-model");
commander_1.program
    .version("1.0.0")
    .description("Kopi Luwak CLI - Tools for managing your Kopi Luwak application");
commander_1.program
    .command("new <projectName>")
    .description("Create a new Kopi Luwak project")
    .action(create_project_1.createNewProject);
commander_1.program
    .command("add-const <constName>")
    .description("Add a new const to the constants configuration")
    .action(add_const_1.addConst);
commander_1.program
    .command("create-command <name> <key>")
    .description("Create a new command and register it with the facade")
    .action(create_command_1.createCommand);
commander_1.program
    .command("create-mediator <name> <key>")
    .description("Create a new mediator and register it with the facade")
    .action(create_mediator_1.createMediator);
commander_1.program
    .command("create-proxy <name> <key>")
    .description("Create a new proxy and register it with the facade")
    .action(create_proxy_1.createProxy);
commander_1.program
    .command("create-service <name> <key>")
    .description("Create a new service and register it with the facade")
    .action(create_service_1.createService);
commander_1.program
    .command("create-model <name>")
    .description("Create a new model")
    .action(create_model_1.createModel);
commander_1.program
    .command("create-store-model <name>")
    .description("Create a new store model")
    .action(create_store_model_1.createStoreModel);
commander_1.program.parse(process.argv);
