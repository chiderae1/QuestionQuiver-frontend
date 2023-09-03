// hooks
import React from "react";

// react-router-dom
import { useNavigate, useLocation } from 'react-router-dom';

// component
import QuestionDetails from './QuestionDetails';

// fetch
import useFetch from "../fetch/useFetch";
import useCheck from "../fetch/useCheck";


// context
import useAuthContext from "../hooks/useAuthContext";


const Questions = () => {

    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const Url = process.env.REACT_APP_API_URL
    
    // context
    const { Auth } = useAuthContext()
    
    // if not logged in go to the login page
    // note this is for the url path
    if (!Auth) {
        navigate('/login')
        localStorage.setItem('path', JSON.stringify(currentPath))
    }

    // to check if user has attempted question already then block access
    useCheck(Auth,currentPath.slice(1))

    // to get the exam Questions
    const { paper, error,time } = useFetch(`${Url}/api/get/test`, currentPath.slice(1))
    
    // start stop watch

    return (
        <div className="Question-page">
            {error && <div className="">{error}</div>}
            {/* display the questions */}
            {paper ? <QuestionDetails Questions={paper} Time = {time} /> :  <p className="loading">LOADING!!!</p>}
        </div>
    )
}

export default React.memo(Questions);