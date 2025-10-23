import Inject from "../../../lib/core/ioc/Inject";
import { container, INJECTED_SERVICE_TOKEN, MyClassWithInjectedEntity } from "../../utils/config"


describe('Inject test suite', 
()=>{
    it('should be able to inject a service into a property', 
    ()=>{
        const obj = new MyClassWithInjectedEntity();
        expect(obj.service).toBeTruthy();
    }); 

    it('should be able to get an injectable entity', 
    ()=>{
        const obj = Inject({token: INJECTED_SERVICE_TOKEN, container: container});
        expect(obj).toBeTruthy();
    }); 
})