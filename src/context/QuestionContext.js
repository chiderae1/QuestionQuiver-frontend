// used to hide or show the baner sorry for the name's
const { createContext, useReducer } = require("react");

export const QuestionContext = createContext()

export const questionReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'validate' :
        return {
            validate : action.payload
        }
        default : 
         return state
    }
}

const QuestionContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(questionReducer, {validate : null})
    return (
        <QuestionContext.Provider value = {{...state,dispatch}}>
            {children}
        </QuestionContext.Provider>
      );
}
 
export default QuestionContextProvider;