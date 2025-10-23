import ICommand from "../../lib/core/command/ICommand";
import Container, { rootContainer } from "../../lib/core/ioc/Container";
import StoreModel from "../../lib/core/model/StoreModel";
import IService from "../../lib/core/service/IService";
import Mediator from "../../lib/core/view/Mediator";
import Model from "../../lib/core/model/Model";
import Proxy from "../../lib/core/model/Proxy";
import Facade from "../../lib/core/Facade";
import Injectable from '../../lib/core/ioc/Injectable';
import RegisterCommand from "../../lib/core/ioc/RegisterCommand";
import RegisterProxy from "../../lib/core/ioc/RegisterProxy";
import RegisterMediator from "../../lib/core/ioc/RegisterMediator";
import { INotification } from "@thetinyspark/tiny-observer";

/** config */
export const GET_RANDOM_NUMBER_QUERY = "GetRandomNumberQuery";
export const CHANGE_NAME_COMMAND = "ChangeNameCommand";
export const DEFAULT_MEDIATOR = "MyMediator";
export const DEFAULT_MODEL = "MyModel";
export const DEFAULT_SERVICE = "MyService";
export const DEFAULT_STORE = "MyStoreModel";
export const DEFAULT_FACADE = "MyFacade";
export const DEFAULT_PROXY = "MyProxy";
export const INJECTED_SERVICE_TOKEN:string = 'MyInjectedService';
export const INJECTED_COMMAND_TOKEN:string = 'MyInjectedCommand';
export const INJECTED_COMMAND_TOKEN2:string = 'MyInjectedCommand2';
export const INJECTED_PROXY_TOKEN:string = 'MyInjectedProxy';
export const INJECTED_PROXY_TOKEN2:string = 'MyInjectedProxy2';
export const INJECTED_MEDIATOR_TOKEN:string = 'MyInjectedMediator';
export const INJECTED_MEDIATOR_TOKEN2:string = 'MyInjectedMediator2';

export const container = new Container();
export const facade = new Facade();

/** default classes */
@RegisterCommand({token: INJECTED_COMMAND_TOKEN, container: container, facade: facade})
class ChangeNameCommand implements ICommand{
    execute(notification:INotification){
        notification.getPayload().name = "Arthur";
    }
}

@RegisterCommand({token: INJECTED_COMMAND_TOKEN2, container: rootContainer})
class GetRandomNumberQuery implements ICommand{
    execute(notification:INotification){
        const min:number = notification.getPayload().min || 0;
        const max:number = notification.getPayload().max || 0;
        return Math.round( Math.random() * ( max - min ) ) + min;
    }
}

@RegisterProxy({token: INJECTED_PROXY_TOKEN, container: container, facade: facade})
class MyProxy1 extends Proxy{}

@RegisterProxy({token: INJECTED_PROXY_TOKEN2, container: rootContainer})
class MyProxy2 extends Proxy{}

@RegisterMediator({token: INJECTED_MEDIATOR_TOKEN, container: container, facade: facade})
class MyMediator1 extends Mediator{}

@RegisterMediator({token: INJECTED_MEDIATOR_TOKEN2, container: rootContainer})
class MyMediator2 extends Mediator{}


@Injectable({token:INJECTED_SERVICE_TOKEN, container: container, singleton:true})
@Injectable({token:INJECTED_SERVICE_TOKEN})
class InjectedService implements IService{};

class MyService implements IService{}


container.register(GET_RANDOM_NUMBER_QUERY, ()=>new GetRandomNumberQuery()); 
container.register(CHANGE_NAME_COMMAND, ()=>new ChangeNameCommand()); 
container.register(DEFAULT_PROXY, ()=>new Proxy());
container.register(DEFAULT_MEDIATOR, ()=>new Mediator());
container.register(DEFAULT_MODEL, ()=>new Model());
container.register(DEFAULT_SERVICE, ()=>new MyService());
container.register(DEFAULT_STORE, ()=>new StoreModel());
container.register(DEFAULT_FACADE, ()=>new Facade());
