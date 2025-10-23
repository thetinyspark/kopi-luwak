#!/usr/bin/env node
import { program } from "commander";
import { createNewProject } from "./commands/create-project";
import { addConst } from "./commands/add-const";
import { createCommand } from "./commands/create-command";
import { createMediator } from "./commands/create-mediator";
import { createProxy } from "./commands/create-proxy";
import { createService } from "./commands/create-service";
import { createModel } from "./commands/create-model";
import { createStoreModel } from "./commands/create-store-model";

program
    .version("1.0.0")
    .description("Kopi Luwak CLI - Tools for managing your Kopi Luwak application");

program
    .command("new <projectName>")
    .description("Create a new Kopi Luwak project")
    .action(createNewProject);

program
    .command("add-const <constName>")
    .description("Add a new const to the constants configuration")
    .action(addConst);

program
    .command("create-command <name> <key>")
    .description("Create a new command and register it with the facade")
    .action(createCommand);

program
    .command("create-mediator <name> <key>")
    .description("Create a new mediator and register it with the facade")
    .action(createMediator);

program
    .command("create-proxy <name> <key>")
    .description("Create a new proxy and register it with the facade")
    .action(createProxy);

program
    .command("create-service <name> <key>")
    .description("Create a new service and register it with the facade")
    .action(createService);

program
    .command("create-model <name>")
    .description("Create a new model")
    .action(createModel);

program
    .command("create-store-model <name>")
    .description("Create a new store model")
    .action(createStoreModel);

program.parse(process.argv);