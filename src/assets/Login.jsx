import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../assets/firebase.config.js";
import { doc, getDoc } from 'firebase/firestore';
import Loading from './Loading.jsx';

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );

  async function handleSignIn(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const uid = user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.exists() ? userDoc.data() : { name: 'User' };

      localStorage.setItem('userId', uid);
      localStorage.setItem('userName', userData.name);

      setLoading(false);
      Swal.fire({
        title: 'Login Completed!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      Navigate('/home');
    } catch (error) {
      Swal.fire({
        title: 'Something Went Wrong!',
        text: error.message,
        icon: 'error',
      });
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <a href="/signUp" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
