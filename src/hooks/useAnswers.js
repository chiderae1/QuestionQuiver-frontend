import { useContext } from "react";
import { Answers } from "../context/AnswersContext";

const useAnswers = () => {
    const context = useContext(Answers)
    if(!context)
    {
        throw Error('useAnswer context must be inside Answers context')
    }
    return context;
}
 
export default useAnswers;