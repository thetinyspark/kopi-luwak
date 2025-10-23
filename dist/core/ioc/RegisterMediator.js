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
 * import { Mediator } from "@thetinyspark/kopi-luwak";
 * import { INotification } from "@thetinyspark/tiny-observer";
 * @RegisterMediator({
 *   token: "MyMediator"
 * })
 * export class MyMediator extends Mediator {
 *     constructor() {}
}
 * }
 *
 * // get Mediator from facade
 * facade.getMediator( "MyMediator", {});
 * ```
 *
 * @param props - Configuration properties for the Mediator
 * @returns A decorator function that registers the target class with the container
 */
function RegisterMediator(props) {
    const container = props.container || Container_1.rootContainer;
    const facade = props.facade || Facade_1.rootFacade;
    const singleton = true;
    return function (target) {
        container.register(props.token, () => new target(), singleton);
        facade.registerMediator(props.token, container.resolve(props.token));
    };
}
exports.default = RegisterMediator;
