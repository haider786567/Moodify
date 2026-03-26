import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../component/Formgroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    const { loading, handleRegister,err } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        const success = await handleRegister({ username, password, email })

        if (success) {
            navigate('/login')
        }

    }

    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Name" placeholder="Enter your name" />
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" placeholder="Enter your email" />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" placeholder="Enter your password" />
                        {err && <p className='error'>{err}</p>}
                    <button className='button' type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </main>
    )
}

export default Register


