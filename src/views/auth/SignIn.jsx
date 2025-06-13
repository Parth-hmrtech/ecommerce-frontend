import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- For navigation
import '../../assets/styles/auth.css';

const SignIn = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign In form data:', formData);
    };

    return (
        <div className="auth-page-wrapper">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Sign In</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                  <div className="auth-footer">
                    <p onClick={() => navigate('/forgot-password')} className="auth-link">
                        Forgot password?
                    </p>
                    </div>
                <button type="submit" className="btn">Login</button>

                {/* Links below the button */}
                <div className="auth-footer">
                  
                    <p>
                        Don’t have an account yet?{' '}
                        <span onClick={() => navigate('/signup')} className="auth-link">
                            Sign Up
                        </span>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default SignIn;
