import Facade, { rootFacade } from "../Facade";
import IMediator from "../view/IMediator";
import Container, { rootContainer } from "./Container";

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
function RegisterMediator<T>(
  props: MediatorProps
): (target: Constructable<T>) => void {
  const container:Container = props.container || rootContainer;
  const facade:Facade = props.facade || rootFacade;
  const singleton = true;
  return function (target: Constructable<T>): void {
    container.register(props.token, () => new target(), singleton);
    facade.registerMediator(props.token, container.resolve(props.token) as IMediator);
  };
}

export default RegisterMediator;
