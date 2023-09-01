// the navigation bar

// Bootstrap
import Button from 'react-bootstrap/Button';

// function
import useLogout from '../hooks/useLogout';

// react-router-dom
import { Link } from 'react-router-dom';

// context
import useAuthContext from '../hooks/useAuthContext';


const Navigation = () => {
    const {Auth} = useAuthContext() 
    const logout = useLogout()
    
    const handleLogout = () => 
    {
        logout()
    }
    return (
        <div className="Navigation w-100">
            <div className="">
                <a href="/" className='brand'>QuestionQuiver</a>
            </div>

            {!Auth &&
                <div className="">
                    <Link to='/login'><Button className='m-3' variant="secondary">Login</Button></Link>
                    <Link to='/signup'><Button className='m-3' variant="secondary">Signup</Button></Link>
                </div>
        }

            {Auth && 
                <div className="d-inline">
                    <span className='fw-bold text-white'>{Auth}</span>
                    <Button className='m-3' variant="secondary" onClick={handleLogout}>Logout</Button>
                </div>
            }

        </div>);
}

export default Navigation;