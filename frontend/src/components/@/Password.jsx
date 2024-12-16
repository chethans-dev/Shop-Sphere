/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const Password = ({ showForgotPassword }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          for="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        {/* Implement this in future */}
        {showForgotPassword && (
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-col relative">
        <input
          id="password"
          name="password"
          type={passwordVisible ? "text" : "password"}
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 focus:outline-none"
        >
          {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Password;
