import Container, { rootContainer } from "./Container";

/**
 * Configuration properties for the Injec decorator
 * @interface Inject
 */
type InjectProps = {
  /** Unique identifier for the injectable entity */
  token: string;
  /** Optional container instance. If not provided, rootContainer will be used */
  container?: Container;
};

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
export function Inject<T>(props: InjectProps) {
    const container = props.container ?? rootContainer;
    const instance = container.resolve(props.token) as T;
    return instance;
}


export default Inject;
