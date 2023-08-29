// used to set invisible's sorry for the name

const { createContext, useReducer } = require("react");

export const Usercontext = createContext()

export const userReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'GET_INVISIBLE':
            return {invisible : action.payload}
        default:
            return state
    }
}   

const UsercontextProvider = ({children}) => 
{
    const [state,dispatch] = useReducer(userReducer,{invisible : false})
    return(
        <Usercontext.Provider value = {{...state,dispatch}}>
            {children}
        </Usercontext.Provider>
    )
}

export default UsercontextProvider