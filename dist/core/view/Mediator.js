"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Mediator class implementing the Mediator pattern
 * Mediators handle view-related logic and communication between components
 *
 * @example
 * ```typescript
 * class UserListMediator extends Mediator {
 *     constructor(private view: HTMLElement) {
 *         super();
 *     }
 *
 *     // Called when the mediator is registered with the facade
 *     onRegister(): void {
 *         const userModel = this.getFacade().getModel("userModel");
 *         userModel.on("usersChanged", this.updateView.bind(this));
 *     }
 *
 *     private updateView(users: User[]): void {
 *         this.view.innerHTML = users
 *             .map(user => `<div>${user.name}</div>`)
 *             .join("");
 *     }
 * }
 *
 * // Usage
 * const mediator = new UserListMediator(document.querySelector(".user-list"));
 * facade.registerMediator("userList", mediator);
 * ```
 */
class Mediator {
    constructor() {
        /** Reference to the application's facade */
        this._facade = null;
    }
    /**
     * Sets the facade reference for this mediator
     * Called automatically by the facade when registering the mediator
     * @param facade - The application facade instance
     */
    setFacade(facade) {
        this._facade = facade;
    }
    /**
     * Gets the facade instance this mediator is registered with
     * @returns The facade instance
     */
    getFacade() {
        return this._facade;
    }
}
exports.default = Mediator;
