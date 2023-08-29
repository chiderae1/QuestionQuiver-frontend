// used to stop the stopwatch when user finishes before time

import { createContext, useReducer } from "react";

export const stoptimecontext = createContext()

export const StoptimeReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'STOPWATCH' :
            return {StopTime : action.payload}
        default:
            return state
    }
}

const StoptimeContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(StoptimeReducer,{StopTime : true})
    return ( 
        <stoptimecontext.Provider value ={{...state,dispatch}}>
            {children}
        </stoptimecontext.Provider>
     );
}
 
export default StoptimeContextProvider;