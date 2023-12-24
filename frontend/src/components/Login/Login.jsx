import { React, useEffect, useState, useRef, useCallback } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
  AiFillFacebook,
  AiFillApple,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { LoginSocialGoogle } from "reactjs-social-login";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  const googleRef = useRef();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const onResolve = async ({ provider, data }) => {
    setProvider(provider);
    setProfile(data);
    console.log("data", data);
    console.log(provider, "provider");
    const googleId = data.sub;
    const email = data.email;
    console.log("Google ID:", googleId);
    console.log("Email:", email);
    await axios
      .post(
        `http://localhost:5000/api/user/google-login`,
        {
          googleId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        window.location.reload(true);
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error occurred.";
        toast.error(errorMessage);
      });
  };
  return (
    <div className=" bg-gradient-to-r overflow-y-hidden from-[#ebdbc2] via-[#ebddc3] to-[#e9d7bc] flex items-center justify-center gap-6 w-full py-[69px] ">
      <div className="sm:ml-3  w-[90%] sm:w-[550px] sm:h-[600px] shadow-lg rounded-lg bg-white flex flex-col justify-center py-12 px-6 lg:px-4 ">
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
        </div>
        <div className="mt-4  mx-auto w-full max-w-md">
          <div className=" py-4 px-4  sm:px-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-[#3F0519]"
                >
                  Submit
                </button>
              </div>
              <p className="text-center text-gray-500">or</p>
              <div>
                <LoginSocialGoogle
                  ref={googleRef}
                  client_id="731375560582-6o2skhnk0e8bnkheg2h7n1u4887buvof.apps.googleusercontent.com"
                  // onLogoutFailure={onLogoutFailure}
                  // onLoginStart={onLoginStart}
                  // onLogoutSuccess={onLogoutSuccess}
                  onResolve={onResolve}
                  scope="profile email"
                  onReject={(err) => {
                    console.log("hbhbdhd", err);
                  }}
                >
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center items-center gap-1 py-2 px-4 border border-gray-500  text-sm font-medium rounded-md text-black bg-white hover:bg-rose-200"
                  >
                    <AiOutlineGoogle size={25} /> Continue with Google
                  </button>
                </LoginSocialGoogle>
              </div>
              {/* <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center items-center gap-1 py-2 px-4 border border-gray-500  text-sm font-medium rounded-md text-black bg-white hover:bg-rose-200"
                >
                  <AiFillFacebook size={25} /> Continue with Facebook
                </button> */}

              {/* <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center items-center gap-1 py-2 px-4 border border-gray-500  text-sm font-medium rounded-md  text-black bg-white hover:bg-rose-200"
                >
                  <AiFillApple size={25} /> Continue with Apple
                </button>
              </div> */}
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Don't have an account ?</h4>
                <Link
                  to="/sign-up"
                  className="text-blue-600 pl-2 hover:text-pink"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative 800px:w-[300px] 800px:h-[500px] lg:w-[550px] lg:h-[600px] cursor-pointer hidden 800px:block mr-1">
        <div className="group perspective-1000px w-full h-full">
          <div className="flip-container">
            <div className="flipper">
              <img
                src="/images/SignUpLogin.png"
                className="front w-full h-full object-cover transform rotate-y-0 transition-transform duration-500 ease-in-out"
                alt="Signup/Login"
              />
              <div className="md:w-[300px] md:h-[500px] lg:w-[550px] lg:h-[600px]  p-2 space-y-2 back absolute  text-[#3F0519] text-xl text-center  rounded-lg inset-0 flex flex-col justify-center items-center bg-[#ebdbc2] font-bold transform rotate-y-180">
                <img src="/images/computer-login-animate.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
