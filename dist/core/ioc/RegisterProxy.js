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
 * import { IProxy } from "@thetinyspark/kopi-luwak";
 * import { INotification } from "@thetinyspark/tiny-observer";
 * @RegisterProxy({
 *   token: "MyProxy"
 * })
 * export class MyProxy implements IProxy {
 *     constructor() {}
}
 * }
 *
 * // get proxy from facade
 * facade.getProxy( "MyProxy", {});
 * ```
 *
 * @param props - Configuration properties for the proxy
 * @returns A decorator function that registers the target class with the container
 */
function RegisterProxy(props) {
    const container = props.container || Container_1.rootContainer;
    const facade = props.facade || Facade_1.rootFacade;
    const singleton = true;
    return function (target) {
        container.register(props.token, () => new target(), singleton);
        facade.registerProxy(props.token, container.resolve(props.token));
    };
}
exports.default = RegisterProxy;
