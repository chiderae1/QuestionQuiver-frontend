import { useContext } from "react";
import { Testcontext } from "../context/TestContext";

const TestContext = () => {
    const context = useContext(Testcontext)
    if(!context)
    {
        throw Error('useTestContext must be used inside TestContext')
    }
    return context;
}
 
export default TestContext;