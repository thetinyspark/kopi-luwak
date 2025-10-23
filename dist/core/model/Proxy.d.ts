import Facade from "../Facade";
import IProxy from "./IProxy";
export default class Proxy implements IProxy {
    private _facade;
    setFacade(facade: Facade): void;
    getFacade(): Facade;
}
