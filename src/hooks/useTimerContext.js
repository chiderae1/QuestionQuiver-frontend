import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const useTimerContext = () => {

    const context = useContext(TimerContext)

    if(!context)
    {
        throw Error('useTimercontext must be used inside Timercontext')
    }
    return context;
}
 
export default useTimerContext;