// not used anywhere

import { createContext, useReducer } from "react";

export const Answers = createContext();

export const AnswersReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'Api':
            return{Answers : action.payload}
        default:
            return state
    }
}

const AnswersProvider = ({children}) => {
    const [state,dispatch] = useReducer(AnswersReducer,{Api : 'https://questionsquiver.onrender.com'})
    return ( 
        <Answers.Provider value = {{...state,dispatch}}>
            {children}
        </Answers.Provider>
     );
}
 
export default AnswersProvider;