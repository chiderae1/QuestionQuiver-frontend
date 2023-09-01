// used to submit answers
import { uselead } from "./uselead"

// context
import useUserContext from "../hooks/useUserContext";
import useTimerContext from '../hooks/useTimerContext';

const useSubmit = () => {

    // context
    const {dispatch} = useUserContext()
    const {dispatch: scoredispatch} = useTimerContext()  
    const Url = process.env.REACT_APP_API_URL
    const submit = async(selectedValue,ExamName,Auth) => 
    {
        const response = await fetch(`${Url}/api/get/test/score`, {
            method: 'POST',
            body: JSON.stringify(selectedValue),
            headers: { 'Content-Type': 'application/json ' }
        })
    
        // retrieve data
        const json = await response.json()
        if (!response.ok) {
            
            throw Error(json.err)         
        }
        if (response.ok) {
            
            // add to leaderboard database
            uselead({ user: Auth, score: json.score, ExamName: ExamName })
            // set invisible to true to show score's and answer's 
            dispatch({type: 'GET_INVISIBLE' , payload : true})
            // update scoers
            scoredispatch({type: 'GET_SCORE' , payload : json.score})

            return {scores : json.score, invisibles : true}
        }
    }

    return submit
}
 
export default useSubmit;