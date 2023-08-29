// not used anywhere

import { createContext, useReducer } from "react";

export const Answers = createContext();

export const AnswersReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'Answers':
            return{Answers : action.payload}
        default:
            return state
    }
}

const AnswersProvider = ({children}) => {
    const [state,dispatch] = useReducer(AnswersReducer,{Answers : {}})
    return ( 
        <Answers.Provider value = {{...state,dispatch}}>
            {children}
        </Answers.Provider>
     );
}
 
export default AnswersProvider;