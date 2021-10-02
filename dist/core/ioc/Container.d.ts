/**
 * Container class for dependency injection
 * Manages the registration and resolution of dependencies
 *
 * @example
 * ```typescript
 * // Create a new container
 * const container = new Container();
 *
 * // Register a service
 * container.register('UserService', () => new UserService());
 *
 * // Register a singleton service
 * container.register('LoggerService', () => new LoggerService(), true);
 *
 * // Resolve services
 * const userService = container.resolve('UserService');
 * const logger1 = container.resolve('LoggerService');
 * const logger2 = container.resolve('LoggerService');
 * console.log(logger1 === logger2); // true (singleton)
 * ```
 */
export default class Container {
    /** Map of token to factory functions */
    private _map;
    /** Map of singleton instances */
    private _singleton;
    /**
     * Creates a new Container instance and initializes the internal maps
     */
    constructor();
    /**
     * Resolves a dependency by its token
     * For singleton dependencies, returns the same instance every time
     * For non-singleton dependencies, creates a new instance each time
     *
     * @param key - The token to resolve
     * @returns The resolved instance or null if not found
     */
    resolve(key: string): any;
    /**
     * Resets the container by clearing all registrations
     * Both regular and singleton instances are removed
     */
    reset(): void;
    /**
     * Registers a dependency with the container
     *
     * @param key - The token to register the dependency under
     * @param factoryMethod - Function that creates the dependency
     * @param singleton - Whether to treat this as a singleton (default: false)
     *
     * @example
     * ```typescript
     * // Register a regular service
     * container.register('api', () => new ApiService());
     *
     * // Register a singleton service
     * container.register('config', () => new ConfigService(), true);
     * ```
     */
    register(key: string, factoryMethod: Function, singleton?: boolean): void;
    /**
     * Gets the factory method for a given token
     *
     * @param key - The token to look up
     * @returns The factory method or null if not found
     */
    get(key: string): Function | null;
}
/**
 * Default root container instance used by the @Injectable decorator
 * This container is used when no specific container is provided
 */
export declare const rootContainer: Container;
