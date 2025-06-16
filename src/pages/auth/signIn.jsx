// /src/pages/auth/SignIn.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';
import SignInForm from '../../views/auth/SignIn'; // ⬅️ The UI component

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (success && user) {
      navigate('/dashboard');
    }

    return () => {
      dispatch(resetAuthState());
    };
  }, [success, user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(formData));
  };

  return (
    <SignInForm
      formData={formData}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
};

export default SignIn;
