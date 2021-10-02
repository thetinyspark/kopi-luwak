"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
/**
 * Extended Model class that implements immutable state management
 * Keeps track of previous state and provides state comparison functionality
 *
 * @example
 * ```typescript
 * const store = new StoreModel();
 *
 * // Initialize state
 * store.setState({ users: [], loading: false });
 *
 * // Update state (immutable)
 * store.setState({ users: [{ id: 1, name: 'John' }] });
 *
 * // Check if state was updated
 * if (store.updated()) {
 *     console.log('State changed');
 *     console.log('Previous:', store.getPrevState());
 *     console.log('Current:', store.getState());
 * }
 * ```
 */
class StoreModel extends Model_1.default {
    constructor() {
        super(...arguments);
        /** Previous state storage */
        this._old = null;
    }
    /**
     * Sets a new state while preserving the old state
     * Creates an immutable state by merging new values with existing state
     * @param value - Partial state to merge with current state
     */
    setState(value) {
        const newState = { ...this._state, ...value };
        this._old = this._state;
        this._state = newState;
        this.deepFreeze(this._state);
    }
    /**
     * Returns the current immutable state
     * @returns The current frozen state
     */
    getState() {
        return this._state;
    }
    /**
     * Retrieves the previous state
     * Useful for state comparison and undo operations
     * @returns The previous state value
     */
    getPrevState() {
        return this._old;
    }
    /**
     * Resets both current and previous states to null
     */
    resetState() {
        this._state = null;
        this._old = null;
    }
    /**
     * Checks if the state was updated and reverts to previous state
     * This method is typically used in change detection cycles
     * @returns true if the state was different from the previous state
     */
    updated() {
        const notSame = this._state !== this._old;
        this._state = this._old;
        return notSame;
    }
    /**
     * Makes an object immutable by deep freezing it
     * @param obj - Object to freeze
     * @returns Frozen object
     * @private
     */
    deepFreeze(obj) {
        return Object.freeze(obj);
    }
}
exports.default = StoreModel;
