import { useContext } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext";

const Useleaderboardcontext = () => {
    const context = useContext(LeaderboardContext)

    if(!context)
        {
            throw Error('useleaderboardcontext must be inside leaderboardcontext')
        }

    return context
}
 
export default Useleaderboardcontext;


