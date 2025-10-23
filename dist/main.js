/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/core/Facade.js":
/*!*****************************!*\
  !*** ./dist/core/Facade.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.rootFacade = void 0;\nconst tiny_observer_1 = __webpack_require__(/*! @thetinyspark/tiny-observer */ \"./node_modules/@thetinyspark/tiny-observer/dist/index.js\");\n/**\n * Core Facade class that implements the Facade pattern\n * Acts as a centralized point of communication between different parts of the application\n *\n * The Facade manages:\n * - Commands (Controller layer)\n * - Proxies (Model layer)\n * - Mediators (View layer)\n * - Services (Business Services)\n *\n * @example\n * ```typescript\n * // Create a facade instance\n * const facade = new Facade();\n *\n * // Register a command\n * facade.registerCommand(\"SAVE_USER\", () => new SaveUserCommand());\n *\n * // Register a proxy\n * facade.registerProxy(\"userProxy\", new UserProxy());\n *\n * // Register a mediator\n * facade.registerMediator(\"userList\", new UserListMediator());\n *\n * // Register a service\n * facade.registerService(\"authService\", new AuthService());\n *\n * // Send a notification (triggers commands)\n * facade.sendNotification(\"SAVE_USER\", { name: \"John\" });\n *\n * // Access registered components\n * const userProxy = facade.getProxy(\"userProxy\");\n * const userList = facade.getMediator(\"userList\");\n * const authService = facade.getService(\"authService\");\n * ```\n */\nclass Facade extends tiny_observer_1.Emitter {\n    constructor() {\n        super(...arguments);\n        /** Map of registered proxies */\n        this._proxies = new Map();\n        /** Map of registered mediators */\n        this._mediators = new Map();\n        /** Map of registered services */\n        this._services = new Map();\n        /**\n         * Sends a notification through the system\n         * Notifications trigger registered commands and can be listened to by other components\n         *\n         * @param key - The notification type\n         * @param payload - Optional data to send with the notification\n         *\n         * @example\n         * ```typescript\n         * facade.sendNotification(\"USER_LOGGED_IN\", { userId: 123 });\n         * ```\n         */\n        this.sendNotification = (key, payload = {}) => {\n            this.emit(key, payload);\n        };\n        this.query = (key, payload = {}) => {\n            const promise = this.emit(key, payload, true);\n            return promise.then((results) => {\n                if (results.length === 1)\n                    return results.shift();\n                return results;\n            });\n        };\n    }\n    /**\n     * Registers a command with the facade\n     * Commands are executed when a notification with matching key is sent\n     *\n     * @param key - The notification type that will trigger this command\n     * @param factoryMethod - Factory method that creates command instances\n     *\n     * @example\n     * ```typescript\n     * facade.registerCommand(\"SAVE_USER\", () => new SaveUserCommand());\n     * ```\n     */\n    registerCommand(key, factoryMethod) {\n        this.subscribe(key, (notification) => {\n            return factoryMethod.call(null).execute(notification);\n        });\n    }\n    /**\n     * Registers a proxy with the facade\n     * Proxies handle data access and business logic\n     *\n     * @param key - Unique identifier for the proxy\n     * @param proxy - The proxy instance to register\n     *\n     * @example\n     * ```typescript\n     * facade.registerProxy(\"userProxy\", new UserProxy());\n     * ```\n     */\n    registerProxy(key, proxy) {\n        proxy.setFacade(this);\n        this._proxies.set(key, proxy);\n    }\n    /**\n     * Registers a mediator with the facade\n     * Mediators handle view-related logic\n     *\n     * @param key - Unique identifier for the mediator\n     * @param mediator - The mediator instance to register\n     *\n     * @example\n     * ```typescript\n     * facade.registerMediator(\"userList\", new UserListMediator());\n     * ```\n     */\n    registerMediator(key, mediator) {\n        mediator.setFacade(this);\n        this._mediators.set(key, mediator);\n    }\n    /**\n     * Registers a service with the facade\n     * Services provide reusable business logic\n     *\n     * @param key - Unique identifier for the service\n     * @param service - The service instance to register\n     *\n     * @example\n     * ```typescript\n     * facade.registerService(\"authService\", new AuthService());\n     * ```\n     */\n    registerService(key, service) {\n        this._services.set(key, service);\n    }\n    /**\n     * Retrieves a registered service\n     * @param key - The service identifier\n     * @returns The service instance or null if not found\n     */\n    getService(key) {\n        return this._services.get(key) || null;\n    }\n    /**\n     * Retrieves a registered proxy\n     * @param key - The proxy identifier\n     * @returns The proxy instance or null if not found\n     */\n    getProxy(key) {\n        return this._proxies.get(key) || null;\n    }\n    /**\n     * Retrieves a registered mediator\n     * @param key - The mediator identifier\n     * @returns The mediator instance or null if not found\n     */\n    getMediator(key) {\n        return this._mediators.get(key) || null;\n    }\n}\nexports[\"default\"] = Facade;\n/**\n * Default root facade instance used by the @Command decorator\n * This facade is used when no specific facade is provided\n */\nexports.rootFacade = new Facade();\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/Facade.js?");

/***/ }),

/***/ "./dist/core/ioc/Container.js":
/*!************************************!*\
  !*** ./dist/core/ioc/Container.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.rootContainer = void 0;\n/**\n * Container class for dependency injection\n * Manages the registration and resolution of dependencies\n *\n * @example\n * ```typescript\n * // Create a new container\n * const container = new Container();\n *\n * // Register a service\n * container.register('UserService', () => new UserService());\n *\n * // Register a singleton service\n * container.register('LoggerService', () => new LoggerService(), true);\n *\n * // Resolve services\n * const userService = container.resolve('UserService');\n * const logger1 = container.resolve('LoggerService');\n * const logger2 = container.resolve('LoggerService');\n * console.log(logger1 === logger2); // true (singleton)\n * ```\n */\nclass Container {\n    /**\n     * Creates a new Container instance and initializes the internal maps\n     */\n    constructor() {\n        this.reset();\n    }\n    /**\n     * Resolves a dependency by its token\n     * For singleton dependencies, returns the same instance every time\n     * For non-singleton dependencies, creates a new instance each time\n     *\n     * @param key - The token to resolve\n     * @returns The resolved instance or null if not found\n     */\n    resolve(key) {\n        if (!this._map.has(key))\n            return null;\n        if (this._singleton.has(key)) {\n            if (this._singleton.get(key) === null) {\n                this._singleton.set(key, this._map.get(key).call(null));\n            }\n            return this._singleton.get(key);\n        }\n        return this._map.get(key).call(null);\n    }\n    /**\n     * Resets the container by clearing all registrations\n     * Both regular and singleton instances are removed\n     */\n    reset() {\n        this._map = new Map();\n        this._singleton = new Map();\n    }\n    /**\n     * Registers a dependency with the container\n     *\n     * @param key - The token to register the dependency under\n     * @param factoryMethod - Function that creates the dependency\n     * @param singleton - Whether to treat this as a singleton (default: false)\n     *\n     * @example\n     * ```typescript\n     * // Register a regular service\n     * container.register('api', () => new ApiService());\n     *\n     * // Register a singleton service\n     * container.register('config', () => new ConfigService(), true);\n     * ```\n     */\n    register(key, factoryMethod, singleton = false) {\n        this._map.delete(key);\n        this._singleton.delete(key);\n        this._map.set(key, factoryMethod);\n        if (singleton)\n            this._singleton.set(key, null);\n    }\n    /**\n     * Gets the factory method for a given token\n     *\n     * @param key - The token to look up\n     * @returns The factory method or null if not found\n     */\n    get(key) {\n        return this._map.get(key) || null;\n    }\n}\nexports[\"default\"] = Container;\n/**\n * Default root container instance used by the @Injectable decorator\n * This container is used when no specific container is provided\n */\nexports.rootContainer = new Container();\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/Container.js?");

/***/ }),

/***/ "./dist/core/ioc/Injectable.js":
/*!*************************************!*\
  !*** ./dist/core/ioc/Injectable.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./dist/core/ioc/Container.js\");\n/**\n * Decorator factory that marks a class as injectable and registers it with the IoC container\n *\n * @example\n * ```typescript\n * // Basic usage with default container\n * @Injectable({\n *   token: \"UserService\"\n * })\n * class UserService {\n *   getUsers() { return []; }\n * }\n *\n * // Custom container and singleton\n * const customContainer = new Container();\n * @Injectable({\n *   token: \"LoggerService\",\n *   container: customContainer,\n *   singleton: true\n * })\n * class LoggerService {\n *   log(msg: string) { console.log(msg); }\n * }\n * ```\n *\n * @param props - Configuration properties for the injectable service\n * @returns A decorator function that registers the target class with the container\n */\nfunction Injectable(props) {\n    const container = props.container || Container_1.rootContainer;\n    const singleton = props.singleton || false;\n    return function (target) {\n        container.register(props.token, () => new target(), singleton);\n    };\n}\nexports[\"default\"] = Injectable;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/Injectable.js?");

/***/ }),

/***/ "./dist/core/ioc/RegisterCommand.js":
/*!******************************************!*\
  !*** ./dist/core/ioc/RegisterCommand.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Facade_1 = __webpack_require__(/*! ../Facade */ \"./dist/core/Facade.js\");\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./dist/core/ioc/Container.js\");\n/**\n * Decorator factory that marks a class as injectable and registers it with the IoC container\n *\n * @example\n * ```typescript\n * // Basic usage with default container\n * import { ICommand } from \"@thetinyspark/kopi-luwak\";\n * import { INotification } from \"@thetinyspark/tiny-observer\";\n * @RegisterCommand({\n *   token: \"StartApp\"\n * })\n * export class StartAppCommand implements ICommand {\n *     constructor() {}\n *\n *     execute(notification: INotification): void {\n *         // Add your command logic here\n *         console.log(notification.getPayload());\n *     }\n}\n * }\n *\n * // start app with default facade\n * facade.sendNotification( \"StartApp\", {});\n * ```\n *\n * @param props - Configuration properties for the command\n * @returns A decorator function that registers the target class with the container\n */\nfunction RegisterCommand(props) {\n    const container = props.container || Container_1.rootContainer;\n    const facade = props.facade || Facade_1.rootFacade;\n    const singleton = false;\n    return function (target) {\n        container.register(props.token, () => new target(), singleton);\n        facade.registerCommand(props.token, container.get(props.token));\n    };\n}\nexports[\"default\"] = RegisterCommand;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/RegisterCommand.js?");

/***/ }),

/***/ "./dist/core/ioc/RegisterMediator.js":
/*!*******************************************!*\
  !*** ./dist/core/ioc/RegisterMediator.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Facade_1 = __webpack_require__(/*! ../Facade */ \"./dist/core/Facade.js\");\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./dist/core/ioc/Container.js\");\n/**\n * Decorator factory that marks a class as injectable and registers it with the IoC container\n *\n * @example\n * ```typescript\n * // Basic usage with default container\n * import { Mediator } from \"@thetinyspark/kopi-luwak\";\n * import { INotification } from \"@thetinyspark/tiny-observer\";\n * @RegisterMediator({\n *   token: \"MyMediator\"\n * })\n * export class MyMediator extends Mediator {\n *     constructor() {}\n}\n * }\n *\n * // get Mediator from facade\n * facade.getMediator( \"MyMediator\", {});\n * ```\n *\n * @param props - Configuration properties for the Mediator\n * @returns A decorator function that registers the target class with the container\n */\nfunction RegisterMediator(props) {\n    const container = props.container || Container_1.rootContainer;\n    const facade = props.facade || Facade_1.rootFacade;\n    const singleton = true;\n    return function (target) {\n        container.register(props.token, () => new target(), singleton);\n        facade.registerMediator(props.token, container.resolve(props.token));\n    };\n}\nexports[\"default\"] = RegisterMediator;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/RegisterMediator.js?");

/***/ }),

/***/ "./dist/core/ioc/RegisterProxy.js":
/*!****************************************!*\
  !*** ./dist/core/ioc/RegisterProxy.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Facade_1 = __webpack_require__(/*! ../Facade */ \"./dist/core/Facade.js\");\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./dist/core/ioc/Container.js\");\n/**\n * Decorator factory that marks a class as injectable and registers it with the IoC container\n *\n * @example\n * ```typescript\n * // Basic usage with default container\n * import { IProxy } from \"@thetinyspark/kopi-luwak\";\n * import { INotification } from \"@thetinyspark/tiny-observer\";\n * @RegisterProxy({\n *   token: \"MyProxy\"\n * })\n * export class MyProxy implements IProxy {\n *     constructor() {}\n}\n * }\n *\n * // get proxy from facade\n * facade.getProxy( \"MyProxy\", {});\n * ```\n *\n * @param props - Configuration properties for the proxy\n * @returns A decorator function that registers the target class with the container\n */\nfunction RegisterProxy(props) {\n    const container = props.container || Container_1.rootContainer;\n    const facade = props.facade || Facade_1.rootFacade;\n    const singleton = true;\n    return function (target) {\n        container.register(props.token, () => new target(), singleton);\n        facade.registerProxy(props.token, container.resolve(props.token));\n    };\n}\nexports[\"default\"] = RegisterProxy;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/RegisterProxy.js?");

/***/ }),

/***/ "./dist/core/ioc/resolve.js":
/*!**********************************!*\
  !*** ./dist/core/ioc/resolve.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./dist/core/ioc/Container.js\");\n/**\n * Resolves a dependency from a container or from the root container\n * This is a convenience function that provides type safety when resolving dependencies\n *\n * @typeParam T - The type of the dependency to resolve\n * @param token - The token of the dependency to resolve\n * @param container - Optional container to resolve from (defaults to rootContainer)\n * @returns The resolved dependency cast to type T\n *\n * @example\n * ```typescript\n * // Define an interface\n * interface IUserService {\n *     getUsers(): User[];\n * }\n *\n * // Register a service\n * @Injectable({\n *     token: \"UserService\"\n * })\n * class UserService implements IUserService {\n *     getUsers() { return []; }\n * }\n *\n * // Resolve with type safety\n * const userService = resolve<IUserService>(\"UserService\");\n * const users = userService.getUsers();\n *\n * // Using a custom container\n * const customContainer = new Container();\n * const logger = resolve<LoggerService>(\"Logger\", customContainer);\n * ```\n */\nfunction resolve(token, container = null) {\n    if (container !== null)\n        return container.resolve(token);\n    else\n        return Container_1.rootContainer.resolve(token);\n}\nexports[\"default\"] = resolve;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/ioc/resolve.js?");

/***/ }),

/***/ "./dist/core/model/Model.js":
/*!**********************************!*\
  !*** ./dist/core/model/Model.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * Base Model class that implements the IModel interface\n * Provides basic state management functionality\n *\n * @example\n * ```typescript\n * class UserModel extends Model {\n *     private users: User[] = [];\n *\n *     constructor() {\n *         super();\n *         this.setState(this.users);\n *     }\n *\n *     addUser(user: User): void {\n *         this.users.push(user);\n *         this.setState([...this.users]);\n *     }\n *\n *     getUsers(): User[] {\n *         return this.getState();\n *     }\n * }\n * ```\n */\nclass Model {\n    constructor() {\n        /** Internal state storage */\n        this._state = null;\n    }\n    /**\n     * Sets the model's state to a new value\n     * @param value - The new state value\n     */\n    setState(value) {\n        this._state = value;\n    }\n    /**\n     * Returns the current state of the model\n     * @returns The current state value\n     */\n    getState() {\n        return this._state;\n    }\n    /**\n     * Resets the model's state to null\n     * Useful for cleanup or initialization\n     */\n    resetState() {\n        this._state = null;\n    }\n}\nexports[\"default\"] = Model;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/model/Model.js?");

/***/ }),

/***/ "./dist/core/model/Proxy.js":
/*!**********************************!*\
  !*** ./dist/core/model/Proxy.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Proxy {\n    constructor() {\n        this._facade = null;\n    }\n    setFacade(facade) {\n        this._facade = facade;\n    }\n    getFacade() {\n        return this._facade;\n    }\n}\nexports[\"default\"] = Proxy;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/model/Proxy.js?");

/***/ }),

/***/ "./dist/core/model/StoreModel.js":
/*!***************************************!*\
  !*** ./dist/core/model/StoreModel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Model_1 = __webpack_require__(/*! ./Model */ \"./dist/core/model/Model.js\");\n/**\n * Extended Model class that implements immutable state management\n * Keeps track of previous state and provides state comparison functionality\n *\n * @example\n * ```typescript\n * const store = new StoreModel();\n *\n * // Initialize state\n * store.setState({ users: [], loading: false });\n *\n * // Update state (immutable)\n * store.setState({ users: [{ id: 1, name: 'John' }] });\n *\n * // Check if state was updated\n * if (store.updated()) {\n *     console.log('State changed');\n *     console.log('Previous:', store.getPrevState());\n *     console.log('Current:', store.getState());\n * }\n * ```\n */\nclass StoreModel extends Model_1.default {\n    constructor() {\n        super(...arguments);\n        /** Previous state storage */\n        this._old = null;\n    }\n    /**\n     * Sets a new state while preserving the old state\n     * Creates an immutable state by merging new values with existing state\n     * @param value - Partial state to merge with current state\n     */\n    setState(value) {\n        const newState = { ...this._state, ...value };\n        this._old = this._state;\n        this._state = newState;\n        this.deepFreeze(this._state);\n    }\n    /**\n     * Returns the current immutable state\n     * @returns The current frozen state\n     */\n    getState() {\n        return this._state;\n    }\n    /**\n     * Retrieves the previous state\n     * Useful for state comparison and undo operations\n     * @returns The previous state value\n     */\n    getPrevState() {\n        return this._old;\n    }\n    /**\n     * Resets both current and previous states to null\n     */\n    resetState() {\n        this._state = null;\n        this._old = null;\n    }\n    /**\n     * Checks if the state was updated and reverts to previous state\n     * This method is typically used in change detection cycles\n     * @returns true if the state was different from the previous state\n     */\n    updated() {\n        const notSame = this._state !== this._old;\n        this._state = this._old;\n        return notSame;\n    }\n    /**\n     * Makes an object immutable by deep freezing it\n     * @param obj - Object to freeze\n     * @returns Frozen object\n     * @private\n     */\n    deepFreeze(obj) {\n        return Object.freeze(obj);\n    }\n}\nexports[\"default\"] = StoreModel;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/model/StoreModel.js?");

/***/ }),

/***/ "./dist/core/module/KopiModule.js":
/*!****************************************!*\
  !*** ./dist/core/module/KopiModule.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * Implementation of the Module pattern for organizing application components\n * Allows grouping related commands, proxies, mediators, and services together\n *\n * @example\n * ```typescript\n * // Create a new module\n * const userModule = new KopiModule();\n *\n * // Configure the module\n * userModule.configure({\n *     commands: [\n *         { key: \"SAVE_USER\", factory: () => new SaveUserCommand() }\n *     ],\n *     proxies: [\n *         { key: \"userProxy\", instance: new UserProxy() }\n *     ],\n *     mediators: [\n *         { key: \"userList\", instance: new UserListMediator() }\n *     ],\n *     services: [\n *         { key: \"userService\", instance: new UserService() }\n *     ]\n * });\n *\n * // Load the module into a facade\n * const facade = new Facade();\n * userModule.load(facade);\n * ```\n */\nclass KopiModule {\n    constructor() {\n        /** Current module configuration */\n        this._config = null;\n    }\n    /**\n     * Loads the module configuration into a facade\n     * Registers all configured commands, proxies, mediators, and services\n     *\n     * @param facade - The facade instance to load components into\n     */\n    load(facade) {\n        if (this._config === null)\n            return;\n        // Register all proxies\n        this._config.proxies.forEach((value) => {\n            facade.registerProxy(value.key, value.instance);\n        });\n        // Register all mediators\n        this._config.mediators.forEach((value) => {\n            facade.registerMediator(value.key, value.instance);\n        });\n        // Register all services\n        this._config.services.forEach((value) => {\n            facade.registerService(value.key, value.instance);\n        });\n        // Register all commands\n        this._config.commands.forEach((value) => {\n            facade.registerCommand(value.key, value.factory);\n        });\n    }\n    /**\n     * Returns the current module configuration\n     * @returns The current ModuleConfiguration or null if not configured\n     */\n    getConfiguration() {\n        return this._config;\n    }\n    /**\n     * Configures the module with components to be loaded\n     * @param config - Configuration containing commands, proxies, mediators, and services\n     */\n    configure(config) {\n        this._config = config;\n    }\n}\nexports[\"default\"] = KopiModule;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/module/KopiModule.js?");

/***/ }),

/***/ "./dist/core/view/Mediator.js":
/*!************************************!*\
  !*** ./dist/core/view/Mediator.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * Base Mediator class implementing the Mediator pattern\n * Mediators handle view-related logic and communication between components\n *\n * @example\n * ```typescript\n * class UserListMediator extends Mediator {\n *     constructor(private view: HTMLElement) {\n *         super();\n *     }\n *\n *     // Called when the mediator is registered with the facade\n *     onRegister(): void {\n *         const userModel = this.getFacade().getModel(\"userModel\");\n *         userModel.on(\"usersChanged\", this.updateView.bind(this));\n *     }\n *\n *     private updateView(users: User[]): void {\n *         this.view.innerHTML = users\n *             .map(user => `<div>${user.name}</div>`)\n *             .join(\"\");\n *     }\n * }\n *\n * // Usage\n * const mediator = new UserListMediator(document.querySelector(\".user-list\"));\n * facade.registerMediator(\"userList\", mediator);\n * ```\n */\nclass Mediator {\n    constructor() {\n        /** Reference to the application's facade */\n        this._facade = null;\n    }\n    /**\n     * Sets the facade reference for this mediator\n     * Called automatically by the facade when registering the mediator\n     * @param facade - The application facade instance\n     */\n    setFacade(facade) {\n        this._facade = facade;\n    }\n    /**\n     * Gets the facade instance this mediator is registered with\n     * @returns The facade instance\n     */\n    getFacade() {\n        return this._facade;\n    }\n}\nexports[\"default\"] = Mediator;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/core/view/Mediator.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.rootFacade = exports.rootContainer = exports.resolve = exports.RegisterMediator = exports.RegisterProxy = exports.RegisterCommand = exports.Injectable = exports.KopiModule = exports.Facade = exports.Mediator = exports.StoreModel = exports.Proxy = exports.Model = exports.Container = void 0;\nconst Container_1 = __webpack_require__(/*! ./core/ioc/Container */ \"./dist/core/ioc/Container.js\");\nexports.Container = Container_1.default;\nconst Container_2 = __webpack_require__(/*! ./core/ioc/Container */ \"./dist/core/ioc/Container.js\");\nObject.defineProperty(exports, \"rootContainer\", ({ enumerable: true, get: function () { return Container_2.rootContainer; } }));\nconst Injectable_1 = __webpack_require__(/*! ./core/ioc/Injectable */ \"./dist/core/ioc/Injectable.js\");\nexports.Injectable = Injectable_1.default;\nconst RegisterCommand_1 = __webpack_require__(/*! ./core/ioc/RegisterCommand */ \"./dist/core/ioc/RegisterCommand.js\");\nexports.RegisterCommand = RegisterCommand_1.default;\nconst RegisterProxy_1 = __webpack_require__(/*! ./core/ioc/RegisterProxy */ \"./dist/core/ioc/RegisterProxy.js\");\nexports.RegisterProxy = RegisterProxy_1.default;\nconst RegisterMediator_1 = __webpack_require__(/*! ./core/ioc/RegisterMediator */ \"./dist/core/ioc/RegisterMediator.js\");\nexports.RegisterMediator = RegisterMediator_1.default;\nconst resolve_1 = __webpack_require__(/*! ./core/ioc/resolve */ \"./dist/core/ioc/resolve.js\");\nexports.resolve = resolve_1.default;\nconst Model_1 = __webpack_require__(/*! ./core/model/Model */ \"./dist/core/model/Model.js\");\nexports.Model = Model_1.default;\nconst Proxy_1 = __webpack_require__(/*! ./core/model/Proxy */ \"./dist/core/model/Proxy.js\");\nexports.Proxy = Proxy_1.default;\nconst StoreModel_1 = __webpack_require__(/*! ./core/model/StoreModel */ \"./dist/core/model/StoreModel.js\");\nexports.StoreModel = StoreModel_1.default;\nconst Mediator_1 = __webpack_require__(/*! ./core/view/Mediator */ \"./dist/core/view/Mediator.js\");\nexports.Mediator = Mediator_1.default;\nconst Facade_1 = __webpack_require__(/*! ./core/Facade */ \"./dist/core/Facade.js\");\nexports.Facade = Facade_1.default;\nconst Facade_2 = __webpack_require__(/*! ./core/Facade */ \"./dist/core/Facade.js\");\nObject.defineProperty(exports, \"rootFacade\", ({ enumerable: true, get: function () { return Facade_2.rootFacade; } }));\nconst KopiModule_1 = __webpack_require__(/*! ./core/module/KopiModule */ \"./dist/core/module/KopiModule.js\");\nexports.KopiModule = KopiModule_1.default;\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./dist/index.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Notification_1 = __webpack_require__(/*! ./Notification */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js\");\r\nvar Emitter = /** @class */ (function () {\r\n    function Emitter() {\r\n        this._observers = new Map();\r\n    }\r\n    Emitter.prototype.emit = function (eventType, payload, promised) {\r\n        var _this = this;\r\n        if (promised === void 0) { promised = false; }\r\n        var observers = this._observers.get(eventType) || [];\r\n        var notif = new Notification_1.default(eventType, this, payload);\r\n        var values = observers.map(function (observer) {\r\n            var result = null;\r\n            if (observer.limit > 0 || observer.infinite) {\r\n                observer.limit--;\r\n                result = observer.func(notif);\r\n            }\r\n            else {\r\n                _this.unsubscribe(eventType, observer.func);\r\n            }\r\n            if (promised)\r\n                return Promise.resolve(result);\r\n        });\r\n        return Promise.all(values);\r\n    };\r\n    Emitter.prototype.hasObservers = function (eventType) {\r\n        return this._observers.get(eventType) !== undefined;\r\n    };\r\n    Emitter.prototype.unsubscribe = function (eventType, observer) {\r\n        if (this.isObserver(eventType, observer)) {\r\n            var observers = this._observers.get(eventType) || [];\r\n            var index = observers.map(function (o) { return o.func; }).indexOf(observer);\r\n            observers.splice(index, 1);\r\n            if (observers.length === 0)\r\n                this._observers.set(eventType, undefined);\r\n        }\r\n    };\r\n    Emitter.prototype.isObserver = function (eventType, observer) {\r\n        var observers = this._observers.get(eventType) || [];\r\n        return observers.map(function (o) { return o.func; }).indexOf(observer) > -1;\r\n    };\r\n    Emitter.prototype.subscribe = function (eventType, observer, limit) {\r\n        if (limit === void 0) { limit = -1; }\r\n        if (this.isObserver(eventType, observer))\r\n            return false;\r\n        var observers = this._observers.get(eventType) || [];\r\n        observers.push({ func: observer, limit: limit, infinite: limit < 0 });\r\n        this._observers.set(eventType, observers);\r\n        return true;\r\n    };\r\n    Emitter.prototype.unsubscribeAll = function () {\r\n        this._observers = new Map();\r\n    };\r\n    return Emitter;\r\n}());\r\nexports[\"default\"] = Emitter;\r\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Notification = /** @class */ (function () {\r\n    function Notification(type, emitter, payload) {\r\n        this._type = type;\r\n        this._emitter = emitter;\r\n        this._payload = payload;\r\n    }\r\n    Notification.prototype.getEventType = function () {\r\n        return this._type;\r\n    };\r\n    Notification.prototype.getEmitter = function () {\r\n        return this._emitter;\r\n    };\r\n    Notification.prototype.getPayload = function () {\r\n        return this._payload;\r\n    };\r\n    return Notification;\r\n}());\r\nexports[\"default\"] = Notification;\r\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Notification = exports.Emitter = void 0;\r\nvar Emitter_1 = __webpack_require__(/*! ./event/Emitter */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js\");\r\nexports.Emitter = Emitter_1.default;\r\nvar Notification_1 = __webpack_require__(/*! ./event/Notification */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js\");\r\nexports.Notification = Notification_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/kopi-luwak/./node_modules/@thetinyspark/tiny-observer/dist/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;