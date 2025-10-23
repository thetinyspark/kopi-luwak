import { ICommandFactoryMethod } from "./command/ICommand";
import IProxy from "./model/IProxy";
import IMediator from "./view/IMediator";
import IService from "./service/IService";
import { Emitter } from "@thetinyspark/tiny-observer";
/**
 * Core Facade class that implements the Facade pattern
 * Acts as a centralized point of communication between different parts of the application
 *
 * The Facade manages:
 * - Commands (Controller layer)
 * - Proxies (Model layer)
 * - Mediators (View layer)
 * - Services (Business Services)
 *
 * @example
 * ```typescript
 * // Create a facade instance
 * const facade = new Facade();
 *
 * // Register a command
 * facade.registerCommand("SAVE_USER", () => new SaveUserCommand());
 *
 * // Register a proxy
 * facade.registerProxy("userProxy", new UserProxy());
 *
 * // Register a mediator
 * facade.registerMediator("userList", new UserListMediator());
 *
 * // Register a service
 * facade.registerService("authService", new AuthService());
 *
 * // Send a notification (triggers commands)
 * facade.sendNotification("SAVE_USER", { name: "John" });
 *
 * // Access registered components
 * const userProxy = facade.getProxy("userProxy");
 * const userList = facade.getMediator("userList");
 * const authService = facade.getService("authService");
 * ```
 */
export default class Facade extends Emitter {
    /** Map of registered proxies */
    private _proxies;
    /** Map of registered mediators */
    private _mediators;
    /** Map of registered services */
    private _services;
    /**
     * Registers a command with the facade
     * Commands are executed when a notification with matching key is sent
     *
     * @param key - The notification type that will trigger this command
     * @param factoryMethod - Factory method that creates command instances
     *
     * @example
     * ```typescript
     * facade.registerCommand("SAVE_USER", () => new SaveUserCommand());
     * ```
     */
    registerCommand(key: string, factoryMethod: ICommandFactoryMethod): void;
    /**
     * Registers a proxy with the facade
     * Proxies handle data access and business logic
     *
     * @param key - Unique identifier for the proxy
     * @param proxy - The proxy instance to register
     *
     * @example
     * ```typescript
     * facade.registerProxy("userProxy", new UserProxy());
     * ```
     */
    registerProxy(key: string, proxy: IProxy): void;
    /**
     * Registers a mediator with the facade
     * Mediators handle view-related logic
     *
     * @param key - Unique identifier for the mediator
     * @param mediator - The mediator instance to register
     *
     * @example
     * ```typescript
     * facade.registerMediator("userList", new UserListMediator());
     * ```
     */
    registerMediator(key: string, mediator: IMediator): void;
    /**
     * Registers a service with the facade
     * Services provide reusable business logic
     *
     * @param key - Unique identifier for the service
     * @param service - The service instance to register
     *
     * @example
     * ```typescript
     * facade.registerService("authService", new AuthService());
     * ```
     */
    registerService(key: string, service: IService): void;
    /**
     * Retrieves a registered service
     * @param key - The service identifier
     * @returns The service instance or null if not found
     */
    getService(key: string): IService;
    /**
     * Retrieves a registered proxy
     * @param key - The proxy identifier
     * @returns The proxy instance or null if not found
     */
    getProxy(key: string): IProxy;
    /**
     * Retrieves a registered mediator
     * @param key - The mediator identifier
     * @returns The mediator instance or null if not found
     */
    getMediator(key: string): IMediator;
    /**
     * Sends a notification through the system
     * Notifications trigger registered commands and can be listened to by other components
     *
     * @param key - The notification type
     * @param payload - Optional data to send with the notification
     *
     * @example
     * ```typescript
     * facade.sendNotification("USER_LOGGED_IN", { userId: 123 });
     * ```
     */
    sendNotification: (key: string, payload?: any) => void;
    query: (key: string, payload?: any) => Promise<any>;
}
/**
 * Default root facade instance used by the @Command decorator
 * This facade is used when no specific facade is provided
 */
export declare const rootFacade: Facade;
