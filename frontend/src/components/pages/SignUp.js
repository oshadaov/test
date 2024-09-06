// src/components/pages/SignUpForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [error, setError] = useState('');

  // Handle input changes and update state
  const handleInputChange = (e) => {
    setError("");
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = userCredentials;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the display name
      await updateProfile(userCredential.user, { displayName });
      console.log('User signed up:', userCredential.user);
      navigate('/home'); // Redirect to Home page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = () => {
    alert("Signing up with Google!");
    // Implement Google Sign-Up if desired
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={userCredentials.displayName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={userCredentials.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={userCredentials.password}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                           focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                       text-sm font-semibold leading-6 text-white shadow-sm 
                       hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>

          {error && <div className='error text-red-500 text-sm'>{error}</div>}
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-1.5 
                       text-sm font-semibold leading-6 text-white shadow-sm 
                       hover:bg-red-500 focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={() => navigate('/signin')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
