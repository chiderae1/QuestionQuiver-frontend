import { useContext } from "react";
import { Usercontext } from "../context/UserContext";

const useUserContext = () => {
    const context = useContext(Usercontext)
    if(!context)
    {
        throw Error('useUserContext must be used inside useContext')
    }
    return context;
}
 
export default useUserContext;