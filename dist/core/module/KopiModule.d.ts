import Facade from "../Facade";
import IKopiModule, { ModuleConfiguration } from "./IKopiModule";
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
export default class KopiModule implements IKopiModule {
    /** Current module configuration */
    private _config;
    /**
     * Loads the module configuration into a facade
     * Registers all configured commands, proxies, mediators, and services
     *
     * @param facade - The facade instance to load components into
     */
    load(facade: Facade): void;
    /**
     * Returns the current module configuration
     * @returns The current ModuleConfiguration or null if not configured
     */
    getConfiguration(): ModuleConfiguration;
    /**
     * Configures the module with components to be loaded
     * @param config - Configuration containing commands, proxies, mediators, and services
     */
    configure(config: ModuleConfiguration): void;
}
