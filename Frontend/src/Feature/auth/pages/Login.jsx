import React, { useState } from 'react'
import "../style/auth.scss"
import FormGroup from '../component/Formgroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login, err } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const success = await login({ email, password });
        if (success) {
            navigate("/app");
        }
    }

    return (
        <main className="auth-page">
            <div className="ambient-bg"></div>
            
            <div className="auth-container glass-panel">
                <div className="auth-header">
                    <div className="logo-icon">🎵</div>
                    <h1>Welcome Back</h1>
                    <p>Login to your Moodify account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
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
                        placeholder="Enter your password"
                        type="password"
                    />
                    {err && <div className="error-message">{err}</div>}
                    
                    <button className="auth-button" type="submit">
                        Login to Moodify
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Create one now</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Login