"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Proxy {
    constructor() {
        this._facade = null;
    }
    setFacade(facade) {
        this._facade = facade;
    }
    getFacade() {
        return this._facade;
    }
}
exports.default = Proxy;
