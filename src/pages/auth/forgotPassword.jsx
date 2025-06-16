// /src/pages/auth/forgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';
import ForgotPasswordView from '../../views/auth/ForgotPassword'; // ⬅️ UI only

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const { loading, error, forgotPasswordMessage: message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(forgotPassword(email));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Clear success message after delay
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <ForgotPasswordView
      email={email}
      loading={loading}
      error={error}
      message={message}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
};

export default ForgotPassword;
