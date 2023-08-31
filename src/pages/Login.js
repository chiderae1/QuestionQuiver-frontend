// login page

// react-router-dom
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// context
import useAuthContext from '../hooks/useAuthContext';


const Login = () => {

    // useStates
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // use context
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    // get data from local storage
    const path = JSON.parse(localStorage.getItem('path'))
    const ExamName = JSON.parse(localStorage.getItem('ExamName'))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const register = { email , password }

        const response = await fetch('http://localhost:8080/api/get/login', {
            method: "POST",
            body: JSON.stringify(register),
            headers: { "Content-Type": 'application/json' }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            dispatch({ type: 'LOGIN', payload: json.Email })
            localStorage.setItem('QuestionQuiver', JSON.stringify(json.Email))
            if (path) {
                navigate(`${path}`)      
            }
            if(!path)
            {
                navigate(`/${ExamName}`)
            }
            if(!path && !ExamName)
            {
                navigate('/')
                // console.log('running')
            }
        }

    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="login-page">
            <center className="login-form">
                <Form onSubmit={handleSubmit}>
                    <h5 className="diplay-5 p-3 fw-bold">LOGIN</h5>
                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>email</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="email or Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setEmail(e.target.value.toLocaleLowerCase())}}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>lock</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="password"
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <InputGroup.Checkbox checked={showPassword}
                            onChange={togglePassword}
                        />
                    </InputGroup>

                    <Button as="input" type="submit" variant="secondary" value="Login" className='w-25' />
                </Form>
                {error && <div className='error w-25'>{error}</div>}


                <div className="mt-2">
                    <span className='small'>
                        Not registered?
                        <Link to='/signup' className='text-decoration-none text-secondary p-2'>
                            signup
                        </Link>
                    </span>
                </div>
            </center>
        </div>
    );
}

export default Login;