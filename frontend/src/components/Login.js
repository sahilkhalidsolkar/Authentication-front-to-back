import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext';
import { Link } from 'react-router-dom'

function Login() {

    const { login } = useContext(AuthContext);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginForToken = (e) => {
        e.preventDefault()
        login({ email, password })
    }

    return (
        <div>
            LOGIN
            <form onSubmit={loginForToken} >
                <input
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                // required
                />
                <input
                    type='text'
                    value={password}
                    placeholder='password'
                    onChange={e => setPassword(e.target.value)}
                // required
                />
                <input type="submit" value="Login" />
            </form>
            <Link to='/register'>register</Link>

        </div>
    )
}

export default Login
