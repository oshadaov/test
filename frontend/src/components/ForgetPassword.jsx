import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/auth/forgotPassword", { email })
      .then((response) => {
        if (response.data.status) {
          setMessage("Email sent successfully");
          setIsSuccess(true);
          alert("Email sent successfully");
        } else {
          setMessage(response.data.message);
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        setMessage("An error occurred while sending the email.");
        setIsSuccess(false);
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className={`text-center text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}

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
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
