import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext';

function Register() {

    const { register } = useContext(AuthContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')



    const registerForToken = (e) => {
        e.preventDefault()
        register({ name, email, password, phone, country })
    }

    return (
        <div>
            Register
            <form onSubmit={registerForToken} >
                <input
                    type='text'
                    value={name}
                    placeholder='Name'
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type='text'
                    value={password}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input
                    type='text'
                    value={phone}
                    placeholder='Phone'
                    onChange={e => setPhone(e.target.value)}
                    required
                />
                <input
                    type='text'
                    value={country}
                    placeholder='Country'
                    onChange={e => setCountry(e.target.value)}
                    required
                />
                <input type="submit" value="Register" />
            </form>

        </div>
    )
}

export default Register
