import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";

const useQuestionContext = () => {
    const context = useContext(QuestionContext)
    if(!context)
    {
        throw Error('useQuestionContext must be used inside useQuestionContext')
    }
    return context;
}
 
export default useQuestionContext;