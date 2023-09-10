// bootstrap
import Button from 'react-bootstrap/Button';

// react-router-dom
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// context
import useAuthContext from '../hooks/useAuthContext';
import useUserContext from '../hooks/useUserContext';
import useTimerContext from '../hooks/useTimerContext';
import useStoptimeContext from '../hooks/useStoptimeContext';
// component
import Stopwatch from './Stopwatch';

// fetch
import useSubmit from '../fetch/useSubmit';

const QuestionDetails = ({ Questions ,Time}) => {

    // useStates
    const [selectedValue, setselectedValue] = useState({})
    const [answers,setAnswers] = useState({})
    // function
    const submit = useSubmit()
    
    // context
    const {dispatch: stoptimedispatch} = useStoptimeContext()
    const { Auth } = useAuthContext()
    const {invisible,dispatch} = useUserContext()
    const {score,dispatch: scoredispatch} = useTimerContext()


    // localstorage
    const ExamName = JSON.parse(localStorage.getItem('ExamName'))

    // when reload update state
    useEffect(() => {
        const storedAnswers = sessionStorage.getItem('clickedAnswers');
        if (storedAnswers) {
            setselectedValue(JSON.parse(storedAnswers));
        }
    },[]);


    const handleBeforeUnload = () => {
        sessionStorage.removeItem('clickedAnswers')
        sessionStorage.setItem('clickedAnswers', JSON.stringify(selectedValue));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // update option's 
    const handleclick = (event, id) => {
        const value = event.target.value
        const updatedAnswers = (include) => ({ ...include, [id]: value })
        setselectedValue(updatedAnswers)
    }


    const handelSubmit = async () => {

        setAnswers(selectedValue)
        const {scores,invisibles} = await submit(selectedValue,ExamName,Auth.email)
       
        
        // set invisible to true to show score's and answers
        dispatch({type: 'GET_INVISIBLE' , payload : invisibles})
        // update scores
        scoredispatch({type: 'GET_SCORE' , payload : scores})
        // stop stopwatch from running
        stoptimedispatch({type:'STOPWATCH', payload : false})
        
    }

    const handleleaderboard = () => {
        setselectedValue({})
        // sessionStorage.removeItemItem('clickedAnswers')
    }

    return (
        <div className="Question-body p-5">
            { Time && <span className='stopalign'><Stopwatch Answers = {selectedValue} Time = {Time}/></span>}
            {/* map through the Questions's */}
            {Questions && Questions.map((item, index) => {
                return (
                    <div className="w-100 bg-white mb-2 p-3 rounded-2" key={item._id}>
                        <p className="lead p-2">{index + 1}: {item.question}</p>

                        <div className="p-2">
                            <input
                             
                                type="radio"
                                value={item.option1}
                                checked={(Object.keys(answers).length !== 0) ? answers[item._id] === item.option1 : selectedValue[item._id] === item.option1}
                                onChange={(e) => handleclick(e, item._id)}
                                disabled={invisible}
                            />
                            <label className='p-1'>{item.option1}</label>
                        </div>

                        <div className="p-2">
                            <input
                                type="radio"
                                value={item.option2}
                                checked={(Object.keys(answers).length !== 0) ? answers[item._id] === item.option2 : selectedValue[item._id] === item.option2}
                                onChange={(e) => handleclick(e, item._id)}
                                disabled={invisible}
                            />
                            <label className='p-1'>{item.option2}</label>
                        </div>

                        <div className="p-2">
                            <input
                                type="radio"
                                value={item.option3}
                                checked={(Object.keys(answers).length !== 0) ? answers[item._id] === item.option3 : selectedValue[item._id] === item.option3}
                                onChange={(e) => handleclick(e, item._id)}
                                disabled={invisible}
                            />
                            <label className="p-1">{item.option3}</label>
                        </div>

                        <div className="p-2">
                            <input
                                type="radio"
                                value={item.option4}
                                checked={(Object.keys(answers).length !== 0) ? answers[item._id] === item.option4 : selectedValue[item._id] === item.option4}
                                onChange={(e) => handleclick(e, item._id)}
                                disabled={invisible}
                            />
                            <label className="p-1">{item.option4}</label>

                        </div>

                        <div className="">
                            {invisible && <p className="p-2 fw-bold text-danger">Answer: {item.answer}</p>}
                        </div>
                    </div>
                )

            })}
            
            {/* click to submit answers and upload but when clicked remove button*/}
            <div className="">
                {!invisible && 
                    <Button variant='secondary' onClick={handelSubmit}>Submit</Button>
                }
            </div>

            {/* click to show scores and leaderbaord */}
            <div className="">
                {invisible &&
                    <p className="lead pt-2 fw-bold text-white">Score:{score}</p>
                }
                {invisible &&
                    <Link to='/leaderboard' onClick={handleleaderboard} className='text-white text-decoration-none' >
                        See where you rank among others
                    </Link>
                }
            </div>

        </div>
    );
}

export default React.memo(QuestionDetails);