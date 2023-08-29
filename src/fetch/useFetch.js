// to fetch exam questions

import { useEffect, useState } from "react";
// context
import useleaderboardcontext from "../hooks/useLeaderboardContext";

const useFetch = (url,currentPath) => {

    // hooks
    const [paper,setPaper] = useState()
    const [error,setError] = useState()
    const [time,setTime] = useState()

    // context
    const { dispatch : timedispatch} = useleaderboardcontext()    

    useEffect(() => 
    {
        const getQuetions = async () => 
        {
            // send examname to backend to get all the question's with the exam name
            const request = {ExamName: currentPath}
            const response =await fetch(url,{
                method : 'POST',
                body : JSON.stringify(request),
                headers : {'Content-Type' : 'application/json'}
            })

            const json = await response.json()

            if(response.ok)
            {
                setPaper(json.Questions)
                setTime(json.time)
                timedispatch({ type: 'validate', payload: true })
            }

            if(!response.ok)
            {
                setError(json.error)
            }
        }

        getQuetions()
        // eslint-disable-next-line 
    },[currentPath,url])

    // return the questions and error if any
    return {paper,error,time};
}
 
export default useFetch;