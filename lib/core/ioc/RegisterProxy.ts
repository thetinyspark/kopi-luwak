import Facade, { rootFacade } from "../Facade";
import IProxy from "../model/IProxy";
import Container, { rootContainer } from "./Container";

/**
 * Represents a constructable type that can be instantiated with new operator
 * @typeParam T - The type of the instance that will be created
 */
type Constructable<T> = new (...args: any[]) => T;

/**
 * Configuration properties for the Proxy decorator
 * @interface ProxyProps
 */
type ProxyProps = {
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
function RegisterProxy<T>(
  props: ProxyProps
): (target: Constructable<T>) => void {
  const container:Container = props.container || rootContainer;
  const facade:Facade = props.facade || rootFacade;
  const singleton = true;
  return function (target: Constructable<T>): void {
    container.register(props.token, () => new target(), singleton);
    facade.registerProxy(props.token, container.resolve(props.token) as IProxy);
  };
}

export default RegisterProxy;
