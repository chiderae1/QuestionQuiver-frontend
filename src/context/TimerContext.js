// used to update score sorry for the name

import { createContext, useReducer } from "react";

export const TimerContext = createContext()

export const timerReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'GET_SCORE':
            return {score : action.payload}
        default : 
            return state
    }
}

const TimerContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(timerReducer,{score: null})
    return ( 
        <TimerContext.Provider value ={{...state,dispatch}}>
            {children}
        </TimerContext.Provider>
     );
}
 
export default TimerContextProvider;