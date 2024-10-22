import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false); // Track token validity

  useEffect(() => {
    // Validate the token when the component loads
    Axios.get(`http://localhost:5000/auth/resetPassword/${token}`)
      .then(response => {
        if (response.data.message === "Token is valid. Proceed to reset password") {
          setIsTokenValid(true); // Allow user to reset password
        } else {
          setError("Invalid or expired token");
        }
      })
      .catch(err => {
        setError("Invalid or expired token");
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear error state before making the request

    Axios.post(`http://localhost:5000/auth/resetPassword/${token}`, { newPassword: password })
      .then(response => {
        if (response.data.message === "Password updated successfully") {
          navigate("/login"); // Redirect to login on success
        } else {
          setError(response.data.message);
        }
      })
      .catch(err => {
        setError("Failed to reset password. Please try again.");
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        {isTokenValid ? (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center text-red-500">
            {error ? error : "Verifying token..."}
          </div>
        )}
      </div>
    </>
  );
}
