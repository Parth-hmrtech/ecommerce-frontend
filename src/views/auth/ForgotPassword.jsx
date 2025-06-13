import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page-wrapper">
      <form className="auth-form">
        <h2>Forgot Password</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your registered email"
          required
        />

        <button type="submit">Send Reset Link</button>

        <div className="auth-footer">
          <span className="auth-link" onClick={() => navigate('/signin')}>
            Back to Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
