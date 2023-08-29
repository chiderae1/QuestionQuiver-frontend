// contain the content that is to be sent to the backend of the leadboard which is the score,email and examname
// wrong name was to be used for something else but on cleaning wasn't needed again
// now it is to be used to send data to the navigation to start time
const { createContext, useReducer } = require("react");

export const LeaderboardContext = createContext()

export const LeaderboardReducer = (state,action) => 
{
    switch(action.type)
    {
        case 'STOPWATCH':
            return{ time : action.payload}
        default:
            return state
    }
}

const LeaderboardContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(LeaderboardReducer, {time : false})
    return ( 
        <LeaderboardContext.Provider value={{...state,dispatch}}>
            {children}
        </LeaderboardContext.Provider>
     );
}
 
export default LeaderboardContextProvider;
