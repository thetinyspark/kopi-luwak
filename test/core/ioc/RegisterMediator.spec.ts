import { rootFacade } from "../../../lib/core/Facade";
import { rootContainer } from "../../../lib/core/ioc/Container";
import { container, facade, INJECTED_MEDIATOR_TOKEN, INJECTED_MEDIATOR_TOKEN2 } from "../../utils/config"


describe('RegisterMediator test suite', 
()=>{
    it('should be able to resolve the mediator on containers', 
    ()=>{
        const mediator = container.resolve(INJECTED_MEDIATOR_TOKEN);
        expect(mediator).toBeTruthy();
    }); 

    it('should be able to resolve the second injectable mediator on the default container', 
    ()=>{
        const mediator = rootContainer.resolve(INJECTED_MEDIATOR_TOKEN2); 
        expect(mediator).toBeTruthy();
    });

    it('should resolve the same instance everytime', 
    ()=>{
        const mediator1 = container.resolve(INJECTED_MEDIATOR_TOKEN); 
        const mediator2 = container.resolve(INJECTED_MEDIATOR_TOKEN); 
        expect(mediator1).toBe(mediator2);
    });

    it('should retrieve proxies on different facades', 
    ()=>{

        const results1 = facade.getMediator(INJECTED_MEDIATOR_TOKEN);
        const results2 = rootFacade.getMediator(INJECTED_MEDIATOR_TOKEN2);

        expect(results1).toBeTruthy();
        expect(results2).toBeTruthy();
    })
})