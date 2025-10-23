import Facade from "../Facade";
import Container from "./Container";
/**
 * Represents a constructable type that can be instantiated with new operator
 * @typeParam T - The type of the instance that will be created
 */
type Constructable<T> = new (...args: any[]) => T;
/**
 * Configuration properties for the Mediator decorator
 * @interface MediatorProps
 */
type MediatorProps = {
    /** Unique identifier for the injectable service */
    token: string;
    /** Optional container instance. If not provided, rootContainer will be used */
    container?: Container;
    /** Optional container instance. If not provided, rootFacade will be used */
    facade?: Facade;
};
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
declare function RegisterMediator<T>(props: MediatorProps): (target: Constructable<T>) => void;
export default RegisterMediator;
