// to show banner when user has attempted question before

// react-router-dom
import { Link } from "react-router-dom";

// context
import useQuestionContext from "../hooks/useQuestionContext";

const Banner = () => {
    const {dispatch} = useQuestionContext()
    const handleclick = () => 
    {
        // to hide banner
        dispatch({type: 'validate',payload : false})
    }
    return (
        <div className="w-100 banner">
            <p className="lead small fw-bold text-center d-inline">Oops! It seems you've already attempted this question.</p>
            <span className="ms-2">
                <Link to='/leaderboard' onClick={handleclick} className='fw-bold small text-decoration-none text-white' >
                    See where you rank among others
                </Link>
            </span>

        </div>
    );
}

export default Banner;