"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Facade_1 = require("../Facade");
const Container_1 = require("./Container");
/**
 * Decorator factory that marks a class as injectable and registers it with the IoC container
 *
 * @example
 * ```typescript
 * // Basic usage with default container
 * import { ICommand } from "@thetinyspark/kopi-luwak";
 * import { INotification } from "@thetinyspark/tiny-observer";
 * @RegisterCommand({
 *   token: "StartApp"
 * })
 * export class StartAppCommand implements ICommand {
 *     constructor() {}
 *
 *     execute(notification: INotification): void {
 *         // Add your command logic here
 *         console.log(notification.getPayload());
 *     }
}
 * }
 *
 * // start app with default facade
 * facade.sendNotification( "StartApp", {});
 * ```
 *
 * @param props - Configuration properties for the command
 * @returns A decorator function that registers the target class with the container
 */
function RegisterCommand(props) {
    const container = props.container || Container_1.rootContainer;
    const facade = props.facade || Facade_1.rootFacade;
    const singleton = false;
    return function (target) {
        container.register(props.token, () => new target(), singleton);
        facade.registerCommand(props.token, container.get(props.token));
    };
}
exports.default = RegisterCommand;
