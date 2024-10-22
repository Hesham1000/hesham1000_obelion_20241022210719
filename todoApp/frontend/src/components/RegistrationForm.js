import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabSwitch = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (isRegistering) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post('http://localhost:8000/api/auth/register', {
            email,
            password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setSuccessMessage(response.data.message);
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage('Passwords do not match');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setSuccessMessage(response.data.message);
        // Redirect to dashboard or perform any other action after successful login
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="registration-form">
      <h1>User Registration and Login</h1>
      <div className="nav-tabs">
        <button onClick={() => setIsRegistering(true)} className={isRegistering ? 'active' : ''}>
          Registration
        </button>
        <button onClick={() => setIsRegistering(false)} className={!isRegistering ? 'active' : ''}>
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <div className="form-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        {!isRegistering && (
          <a href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="primary-action-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        {isRegistering && (
          <a href="/terms-and-conditions" className="terms-and-conditions-link">
            Terms and Conditions
          </a>
        )}
      </form>
      <footer>
        <p>© 2023 Your Company. <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default RegistrationForm;
