"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the Module pattern for organizing application components
 * Allows grouping related commands, proxies, mediators, and services together
 *
 * @example
 * ```typescript
 * // Create a new module
 * const userModule = new KopiModule();
 *
 * // Configure the module
 * userModule.configure({
 *     commands: [
 *         { key: "SAVE_USER", factory: () => new SaveUserCommand() }
 *     ],
 *     proxies: [
 *         { key: "userProxy", instance: new UserProxy() }
 *     ],
 *     mediators: [
 *         { key: "userList", instance: new UserListMediator() }
 *     ],
 *     services: [
 *         { key: "userService", instance: new UserService() }
 *     ]
 * });
 *
 * // Load the module into a facade
 * const facade = new Facade();
 * userModule.load(facade);
 * ```
 */
class KopiModule {
    constructor() {
        /** Current module configuration */
        this._config = null;
    }
    /**
     * Loads the module configuration into a facade
     * Registers all configured commands, proxies, mediators, and services
     *
     * @param facade - The facade instance to load components into
     */
    load(facade) {
        if (this._config === null)
            return;
        // Register all proxies
        this._config.proxies.forEach((value) => {
            facade.registerProxy(value.key, value.instance);
        });
        // Register all mediators
        this._config.mediators.forEach((value) => {
            facade.registerMediator(value.key, value.instance);
        });
        // Register all services
        this._config.services.forEach((value) => {
            facade.registerService(value.key, value.instance);
        });
        // Register all commands
        this._config.commands.forEach((value) => {
            facade.registerCommand(value.key, value.factory);
        });
    }
    /**
     * Returns the current module configuration
     * @returns The current ModuleConfiguration or null if not configured
     */
    getConfiguration() {
        return this._config;
    }
    /**
     * Configures the module with components to be loaded
     * @param config - Configuration containing commands, proxies, mediators, and services
     */
    configure(config) {
        this._config = config;
    }
}
exports.default = KopiModule;
