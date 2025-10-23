import Facade from "../Facade";
import Container from "./Container";
/**
 * Represents a constructable type that can be instantiated with new operator
 * @typeParam T - The type of the instance that will be created
 */
type Constructable<T> = new (...args: any[]) => T;
/**
 * Configuration properties for the Command decorator
 * @interface CommandProps
 */
type CommandProps = {
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
declare function RegisterCommand<T>(props: CommandProps): (target: Constructable<T>) => void;
export default RegisterCommand;
