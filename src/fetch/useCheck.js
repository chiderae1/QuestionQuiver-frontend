// to check if user has attempted question before

// hooks
import { useState, useEffect } from "react";

// react-router-dom
import { useNavigate } from 'react-router-dom';

// use context
import useTimerContext from '../hooks/useTimerContext';
import useUserContext from '../hooks/useUserContext';

const useCheck = (username, ExamName) => {

    // hooks
    const [attempted, setAttempted] = useState(null)
    // const [Not_attempted, setNot_Attempted] = useState(null)

    // context
    const { dispatch: scoredispatch } = useTimerContext()
    const { dispatch: invisibledispatch } = useUserContext()
    
    // RRD
    const navigate = useNavigate();
    
    useEffect(() => {
        const request = { username, ExamName }
        const Url = process.env.REACT_APP_API_URL
        const checkAttempted = async () => {
            const response = await fetch(`${Url}/api/get/test/check/leadboard`, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json()

            if (response.ok) {
                setAttempted(json.attempted)
            }

            // if(!response.ok)
            // {
            //     throw Error(json.error)
            // }
        }

        checkAttempted()

        // if question has been attempted
        if (attempted) {
            // navigate error
            navigate('/error')

            // set score to null refer to Question details for better understanding
            scoredispatch({ type: 'GET_SCORE', payload: null })

            // set invisivle to false refer to Question details for better understanding
            invisibledispatch({ type: 'GET_INVISIBLE', payload: false })

        }
    // eslint-disable-next-line 
    }, [ExamName, attempted, username])
}

export default useCheck;




