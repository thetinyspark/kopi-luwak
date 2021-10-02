"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Model class that implements the IModel interface
 * Provides basic state management functionality
 *
 * @example
 * ```typescript
 * class UserModel extends Model {
 *     private users: User[] = [];
 *
 *     constructor() {
 *         super();
 *         this.setState(this.users);
 *     }
 *
 *     addUser(user: User): void {
 *         this.users.push(user);
 *         this.setState([...this.users]);
 *     }
 *
 *     getUsers(): User[] {
 *         return this.getState();
 *     }
 * }
 * ```
 */
class Model {
    constructor() {
        /** Internal state storage */
        this._state = null;
    }
    /**
     * Sets the model's state to a new value
     * @param value - The new state value
     */
    setState(value) {
        this._state = value;
    }
    /**
     * Returns the current state of the model
     * @returns The current state value
     */
    getState() {
        return this._state;
    }
    /**
     * Resets the model's state to null
     * Useful for cleanup or initialization
     */
    resetState() {
        this._state = null;
    }
}
exports.default = Model;
