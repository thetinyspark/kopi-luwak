"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const Container_1 = require("./Container");
/**
 * Decorator that injects a, injectable entity inside a property as with the IoC container
 *
 * @example
 * ```typescript
 * // Basic usage with default container
 
 * class MyClass {
 * constructor(
 *  private _service:UserService = Inject<UserService>({token: "UserService", container: rootContainer})
 * ){}
 *
 *
 * }
 *
 * ```
 *
 * @param props - Configuration properties for the inject decorator
 * @returns An instance of an injectable entity or null
 */
function Inject(props) {
    const container = props.container ?? Container_1.rootContainer;
    const instance = container.resolve(props.token);
    return instance;
}
exports.Inject = Inject;
exports.default = Inject;
