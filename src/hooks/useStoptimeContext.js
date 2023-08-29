import { useContext } from "react";
import { stoptimecontext } from "../context/StoptimeContext";



const useStoptimeContext = () => {
    const context = useContext(stoptimecontext)
    if (!context) {
        throw Error('useStoptimeContext must be used inside stoptimeContext')
    }
    return context
}

export default useStoptimeContext;