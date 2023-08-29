// react-router-dom
import { Link } from 'react-router-dom';
import React, { useState } from 'react'


import useTestcheck from '../fetch/useTestcheck'
// usecontext
import useTestContext from '../hooks/useTestContext'
// this useQuestionContext could have a better name usevalidate, used to check for validation of banner



const Test = () => {

    // useContext
    const { test } = useTestContext()
    
    // hooks
    const [attempted, setAttempted] = useState(null)
    const [Not_Attempted, setNot_Attempted] = useState(null)
    const [load, setLoad] = useState(null)
    const [examname, setExamname] = useState('')


    // to check if user has attempted  question already
    const handleClick = async (ExamName) => {
        
        localStorage.setItem('ExamName', JSON.stringify(ExamName))
        const username = JSON.parse(localStorage.getItem('QuestionQuiver'))
        const register = { username, ExamName }
        // we send the email and examname to the backend to check if they exist in the database
        const response = await fetch('http://localhost:8080/api/get/test/check/leadboard',
            {
                method: 'POST',
                body: JSON.stringify(register),
                headers: { 'Content-Type': 'application/json' }
            })

        // get response
        const json = await response.json()


        // if the response was okay don't give him access. refer to backend for better understanding
        if (response.ok) {
            // setAttempted(!json)
            setAttempted(json.attempted)
            setNot_Attempted(json.Not_attempted)
            setLoad(true)
            setExamname(ExamName)
        }

        // if the reponse was not okay give him access. refer to backend for better understanding
        if (!response.ok) {
            setLoad(true)
            setNot_Attempted(json.restricted)
        }
    }

    // where the validation takes place
    useTestcheck (load,attempted,Not_Attempted,examname)
   
    return (
        <div className="test-body p-3">
            <p className="lead fw-bold text-white d-flex justify-content-center quizzes">AVAILABLE QUIZZES</p>
            {test && test.map((item, index) => {
                return (
                    <div className="p-3" key={index}>
                        <Link onClick={() => handleClick(item)} className='text-decoration-none text-white'>
                            <span className='fw-bold display-5'>&#183;</span>
                            <span className='test-name fw-bold'>{item}</span>
                        </Link>
                    </div>
                )

            })}
        </div>
    );
}

export default React.memo(Test);
