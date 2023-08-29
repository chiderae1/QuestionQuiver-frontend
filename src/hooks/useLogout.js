// used to logoout the user

// context
import useAuthContext from "./useAuthContext"
import useUserContext from '../hooks/useUserContext';
import useTimerContext from '../hooks/useTimerContext';
import useQuestionContext from "./useQuestionContext";
import { useNavigate } from 'react-router-dom';
const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext()
    const { dispatch:invisibledispatch } = useUserContext()
    const {  dispatch: scoredispatch } = useTimerContext()
    const {dispatch : bannerdispatch} = useQuestionContext()
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('QuestionQuiver')
        // localStorage.removeItem('Question')
        localStorage.removeItem('ExamName')
        sessionStorage.removeItem('clickedAnswers')
        localStorage.removeItem('path')
        // navgite to home upon click
        navigate('/')

        invisibledispatch({type: 'GET_INVISIBLE' , payload : false})
        scoredispatch({type: 'GET_SCORE' , payload : null})
        bannerdispatch({type: 'validate', payload : false})
    }
    return logout
}

export default useLogout;



