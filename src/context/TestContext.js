// contains the test question


import { createContext, useReducer } from "react";

export const Testcontext  = createContext()

export const testReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'TEST_NAME':
            return{
                test : action.payload
            }
        default :
            return state
    }
}

const TestcontextProvider = ({children}) => {
    const [state,dispatch] = useReducer(testReducer,{test : null})
    return (
        <Testcontext.Provider value={{...state,dispatch}}>
            {children}
        </Testcontext.Provider>
     );
}
 
export default TestcontextProvider;