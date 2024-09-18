import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../assets/firebase.config.js";
import { doc, setDoc } from 'firebase/firestore';
import Loading from './Loading.jsx';

const SignUp = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );

  function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        const userData = { name, email, uid };
        localStorage.setItem('userId', uid);
        localStorage.setItem('userName', name);
        await setDoc(doc(db, "users", uid), userData);

        Swal.fire({
          title: 'SignUp Completed!',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        setLoading(false);
        Navigate('/home');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Something Went Wrong!',
          text: error.message,
          icon: 'error',
        });
        setLoading(false);
      });
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="form-input"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="signup-text">
          <a href="#" className="signup-link">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
