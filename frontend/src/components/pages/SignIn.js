import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; 
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function SignInForm() {
  const navigate = useNavigate();
  
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(userCredentials);
  }

  function handleSignIn(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate('/home'); // Redirect to Home page after successful login
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    if (!userCredentials.email) {
      setError("Please enter your email address first.");
      return;
    }

    sendPasswordResetEmail(auth, userCredentials.email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const handleGoogleSignIn = () => {
    alert("Signing in with Google!");
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleCredentials}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                onChange={handleCredentials}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handlePasswordReset}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <button onClick={handleSignUpRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
