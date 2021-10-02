import IStoreModel from "./IStoreModel";
import Model from "./Model";
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
export default class StoreModel extends Model implements IStoreModel {
    /** Previous state storage */
    private _old;
    /**
     * Sets a new state while preserving the old state
     * Creates an immutable state by merging new values with existing state
     * @param value - Partial state to merge with current state
     */
    setState(value: any): void;
    /**
     * Returns the current immutable state
     * @returns The current frozen state
     */
    getState(): any;
    /**
     * Retrieves the previous state
     * Useful for state comparison and undo operations
     * @returns The previous state value
     */
    getPrevState(): any;
    /**
     * Resets both current and previous states to null
     */
    resetState(): void;
    /**
     * Checks if the state was updated and reverts to previous state
     * This method is typically used in change detection cycles
     * @returns true if the state was different from the previous state
     */
    updated(): boolean;
    /**
     * Makes an object immutable by deep freezing it
     * @param obj - Object to freeze
     * @returns Frozen object
     * @private
     */
    private deepFreeze;
}
