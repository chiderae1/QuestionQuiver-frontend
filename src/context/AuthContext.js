//  contains the authentication data that is email

import { createContext, useEffect, useReducer } from "react";

export const Authcontext = createContext()

export const authReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'LOGIN' : 
            return {Auth : action.payload }
        case 'LOGOUT':
            return { Auth : null}
        default : 
            return state
    }
}
const AuthcontextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,{Auth : null})
    useEffect(() => 
    {
        const user = JSON.parse(localStorage.getItem('QuestionQuiver'))
        dispatch({type : 'LOGIN' , payload : user})
    },[])
    return ( 
    <Authcontext.Provider value={{...state,dispatch}}>
        {children}
    </Authcontext.Provider> 
    )
}
 
export default AuthcontextProvider;
