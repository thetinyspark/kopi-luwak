"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
/**
 * Decorator factory that marks a class as injectable and registers it with the IoC container
 *
 * @example
 * ```typescript
 * // Basic usage with default container
 * @Injectable({
 *   token: "UserService"
 * })
 * class UserService {
 *   getUsers() { return []; }
 * }
 *
 * // Custom container and singleton
 * const customContainer = new Container();
 * @Injectable({
 *   token: "LoggerService",
 *   container: customContainer,
 *   singleton: true
 * })
 * class LoggerService {
 *   log(msg: string) { console.log(msg); }
 * }
 * ```
 *
 * @param props - Configuration properties for the injectable service
 * @returns A decorator function that registers the target class with the container
 */
function Injectable(props) {
    const container = props.container || Container_1.rootContainer;
    const singleton = props.singleton || false;
    return function (target) {
        container.register(props.token, () => new target(), singleton);
    };
}
exports.default = Injectable;
