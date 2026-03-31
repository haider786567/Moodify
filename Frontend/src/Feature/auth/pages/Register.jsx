import React, { useState } from 'react'
import "../style/auth.scss"
import FormGroup from '../component/Formgroup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { loading, register, err } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        const success = await register({ username, password, email })
        if (success) {
            navigate('/login')
        }
    }

    return (
        <main className="auth-page">
            <div className="ambient-bg"></div>
            
            <div className="auth-container glass-panel">
                <div className="auth-header">
                    <div className="logo-icon">🎵</div>
                    <h1>Create Account</h1>
                    <p>Join Moodify to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <FormGroup
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Name" 
                        placeholder="Enter your name" 
                    />
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" 
                        placeholder="Enter your email" 
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" 
                        placeholder="Create a password" 
                        type="password"
                    />
                    {err && <div className="error-message">{err}</div>}
                    
                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Register
