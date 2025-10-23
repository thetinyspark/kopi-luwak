import { rootFacade } from "../../../lib/core/Facade";
import { rootContainer } from "../../../lib/core/ioc/Container";
import { container, facade, INJECTED_COMMAND_TOKEN, INJECTED_COMMAND_TOKEN2 } from "../../utils/config"


describe('RegisterCommand test suite', 
()=>{
    it('should be able to resolve the command on containers', 
    ()=>{
        const command = container.resolve(INJECTED_COMMAND_TOKEN);
        expect(command).toBeTruthy();
    }); 

    it('should be able to resolve the second injectable command on the default container', 
    ()=>{
        const service = rootContainer.resolve(INJECTED_COMMAND_TOKEN2); 
        expect(service).toBeTruthy();
    });

    it('should retrieve observers on different facades', 
    ()=>{

        const results1 = facade.hasObservers(INJECTED_COMMAND_TOKEN);
        const results2 = rootFacade.hasObservers(INJECTED_COMMAND_TOKEN2);

        expect(results1).toBe(true);
        expect(results2).toBe(true);
    })
})