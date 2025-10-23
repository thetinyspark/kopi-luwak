import { rootFacade } from "../../../lib/core/Facade";
import { rootContainer } from "../../../lib/core/ioc/Container";
import { container, facade, INJECTED_PROXY_TOKEN, INJECTED_PROXY_TOKEN2 } from "../../utils/config"


describe('RegisterProxy test suite', 
()=>{
    it('should be able to resolve the proxy on containers', 
    ()=>{
        const proxy = container.resolve(INJECTED_PROXY_TOKEN);
        expect(proxy).toBeTruthy();
    }); 

    it('should be able to resolve the second injectable proxy on the default container', 
    ()=>{
        const service = rootContainer.resolve(INJECTED_PROXY_TOKEN2); 
        expect(service).toBeTruthy();
    });

    it('should resolve the same instance everytime', 
    ()=>{
        const proxy1 = container.resolve(INJECTED_PROXY_TOKEN); 
        const proxy2 = container.resolve(INJECTED_PROXY_TOKEN); 
        expect(proxy1).toBe(proxy2);
    });

    it('should retrieve proxies on different facades', 
    ()=>{

        const results1 = facade.getProxy(INJECTED_PROXY_TOKEN);
        const results2 = rootFacade.getProxy(INJECTED_PROXY_TOKEN2);

        expect(results1).toBeTruthy();
        expect(results2).toBeTruthy();
    })
})