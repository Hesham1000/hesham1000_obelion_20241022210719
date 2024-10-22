import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.js.css';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        
        const response = await axios.post('http://localhost:8000/api/auth/register', {
          email,
          password,
        }, {
          headers: { 'Content-Type': 'application/json' },
        });
        
        alert(response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
          email,
          password,
        }, {
          headers: { 'Content-Type': 'application/json' },
        });
        
        alert(response.data.message);
        // Redirect to dashboard or perform other actions on successful login
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="login-form-container">
      <header>User Registration and Login</header>
      <nav>
        <button onClick={() => setIsRegistering(true)}>Registration</button>
        <button onClick={() => setIsRegistering(false)}>Login</button>
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {isRegistering && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {!isRegistering && <a href="#forgot-password">Forgot Password?</a>}
      <footer>
        {isRegistering && <a href="#terms-conditions">Terms and Conditions</a>}
        <p>&copy; 2023 Company Name</p>
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#terms-service">Terms of Service</a>
      </footer>
    </div>
  );
};

export default LoginForm;
