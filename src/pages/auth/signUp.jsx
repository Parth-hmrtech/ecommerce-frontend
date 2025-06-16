// /src/pages/auth/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../store/actions/authActions';
import { resetAuthState } from '../../store/reducers/authReducer';
import SignUpForm from '../../views/auth/SignUp'; // ⬅️ UI-only component

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password_hash: '',
    role: 'buyer',
    phone_number: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'confirm_password') {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password_hash !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const jsonPayload = JSON.stringify(formData);
    dispatch(signUpUser(jsonPayload));
  };

  useEffect(() => {
    if (success) {
      navigate('/signin');
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);

  return (
    <SignUpForm
      formData={formData}
      confirmPassword={confirmPassword}
      showPassword={showPassword}
      showConfirm={showConfirm}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setShowPassword={setShowPassword}
      setShowConfirm={setShowConfirm}
      navigate={navigate}
    />
  );
};

export default SignUp;
