// used to check whether user is permitted to take test or not

// hooks
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// context
import useAuthContext from '../hooks/useAuthContext';
import useleaderboardcontext from '../hooks/useLeaderboardContext';
import useTimerContext from '../hooks/useTimerContext';
import useUserContext from '../hooks/useUserContext';
// this useQuestionContext could have a better name usevalidate, used to check for validation of banner
import useQuestionContext from '../hooks/useQuestionContext';

const useTestContext = (load, attempted, Not_Attempted, examname) => {
    const { Auth } = useAuthContext()
    const { dispatch } = useQuestionContext()
    const { dispatch: time } = useleaderboardcontext()
    const { dispatch: scoredispatch } = useTimerContext()
    const { dispatch: invisibledispatch } = useUserContext()
    const navigate = useNavigate();

    const currentURL = window.location.href;
    
    return (
        useEffect(() => {
            // doesn't run till response is gotten from backend
            if (load) {
                // if attemped set validate to true in Question_context which then display's the banner
                if (attempted) {
                    if (attempted) {
                        // show banner
                        dispatch({ type: 'validate', payload: true })
                        // set score to null refer to Question details for better understanding
                        scoredispatch({ type: 'GET_SCORE', payload: null })
                        // set invisible to false refer to Question details for better understanding
                        invisibledispatch({ type: 'GET_INVISIBLE', payload: false })
                    }
                }
                // http://localhost:8080/TMC411
                
                if (Not_Attempted) {
                    // if not attempted and user is logged in then give him access validate to false to hide banner
                    if (Not_Attempted && Auth) {

                        // set score to null refer to Question details for better understanding
                        scoredispatch({ type: 'GET_SCORE', payload: null })
                        // set invisible to false refer to Question details for better understanding
                        invisibledispatch({ type: 'GET_INVISIBLE', payload: false })

                        // hide banner
                        dispatch({ type: 'validate', payload: false })
                        // start stopwatch
                        time({ type: 'STOPWATCH', payload: true })

                        window.open(`${currentURL}${examname}`, '_blank');
                    }
                    // if not attempted but user not logged in then navigate to login page validate to false to hide banner
                    if (Not_Attempted && !Auth) {

                        // hide banner
                        dispatch({ type: 'validate', payload: false })

                        // go to login page
                        navigate('/login')
                    }
                }
            }
            // eslint-disable-next-line 
        }, [load])

    );
}

export default useTestContext;