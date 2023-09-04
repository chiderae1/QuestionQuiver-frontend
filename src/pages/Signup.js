// the signup page

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useAuthContext from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [error,setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {dispatch} = useAuthContext()
    const path = JSON.parse(localStorage.getItem('path'))
    const ExamName = JSON.parse(localStorage.getItem('ExamName'))

    const Url = process.env.REACT_APP_API_URL
    const handleSubmit = async(e) => 
    {
        e.preventDefault()
        const register = {email,password,username}

        const response = await fetch(`${Url}/api/get/signup`,{
            method : "POST",
            body : JSON.stringify(register),
            headers : {"Content-Type" : 'application/json'}
        })

        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
        }
        if(response.ok)
        {   
            dispatch({type : 'LOGIN' , payload : json.email})
            localStorage.setItem('QuestionQuiver',JSON.stringify(json.email))
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
                    <h5 className="diplay-5 p-3 fw-bold">Signup</h5>
                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>lock</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="username"
                            aria-label="text"
                            aria-describedby="basic-addon1"
                            onChange={(e) =>  setUsername(e.target.value) }
                        />
                    </InputGroup>

                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>email</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={(e) =>  setEmail(e.target.value) }
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

                    <Button as="input" type="submit" variant="secondary" value="Signup" className='w-25' />
                </Form>
                    {error && <div className='error w-25'>{error}</div>} 
                
                <div className="mt-2">
                    <span className='small'>
                        Have an account? 
                        <Link to = '/login' className='text-decoration-none text-secondary p-2'>
                            login
                        </Link>
                    </span>
                </div>

            </center>
        </div>
    );
}

export default Signup;