// if question answered already

// react-router-dom
import { Link } from "react-router-dom";

// context
import useTimerContext from "../hooks/useTimerContext";
import useUserContext from "../hooks/useUserContext";
import useAuthContext from "../hooks/useAuthContext";

// react-router-dom
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    // context
    const {dispatch: scoredispatch} = useTimerContext()
    const {dispatch : invisibledispatch} = useUserContext()
    const {Auth} = useAuthContext()

    // hooks
    const navigate = useNavigate();
    
    if(!Auth){
        navigate('/login')
    }
    const handleclick = () => 
    {
        // set scoer to null refer to Question details
        scoredispatch({ type: 'GET_SCORE', payload: null })
        // set invisible to false refer to Question details 
        invisibledispatch({ type: 'GET_INVISIBLE', payload: false }) 
    }

    return (
        <div className="not-found">
            <center className="not-found-align">
                <p className="lead fw-bold">Oops! It seems you've already attempted this question.</p>
                <Link to='/leaderboard' className='fw-bold text-decoration-none' onClick={handleclick}>
                    See where you rank among others
                </Link>
            </center>

        </div>
    );
}

export default NotFound;