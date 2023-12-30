import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const FormHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/reset-password`,
        {
          email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="bg-gradient-to-r overflow-y-hidden from-[#ebdbc2] via-[#ebddc3] to-[#e9d7bc] flex items-center justify-center h-[100vh] ">
      <div class="max-w-md w-[90%] mx-auto  bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center ">
        <h2 class="mt-2 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
          Reset password
        </h2>
        <p class="text-slate-500 text-center pt-2">
          Enter your user account's verified email address and we will send you
          a password reset link
        </p>

        <form onSubmit={FormHandler} class="py-8 px-10">
          <div class="flex flex-col space-y-4">
            <label
              htmlFor="email"
              className="block  font-medium text-gray-700 "
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              class="w-full py-2 border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
            <button
              class="w-full py-3 font-medium text-white  rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center bg-black hover:bg-[#3F0519]"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p class="text-center">
              Not registered yet?{" "}
              <Link
                to="/sign-up"
                class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
