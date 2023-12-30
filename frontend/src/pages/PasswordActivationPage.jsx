import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";
import { toast } from "react-toastify";

const PasswordActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);
  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/change-new-password`,
        { activation_token, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);

        setNewPassword("");
        setConfirmPassword("");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-[100%] h-[100hv] flex justify-center items-center text-[rgb(0,0,0)]">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div>
          <div className="mx-auto py-8 px-6">
            <div className="px-5 mx-auto">
              <form
                onSubmit={passwordChangeHandler}
                className="flex flex-col justify-between"
              >
                <div className="w-[100%] 620px:flex 620px:items-center 620px:justify-between gap-3  pb-4">
                  <label className="">Enter your new password</label>
                  <input
                    type="password"
                    className={`border border-black  mt-3 px-3 py-2 bg-beige   placeholder-slate-800  md:w-[75%] w-[100%] text-sm focus:outline-none focus:ring-pink focus:border-pink`}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 620px:flex 620px:items-center 620px:justify-between   pb-4">
                  <label className="">Enter your confirm password</label>
                  <input
                    type="password"
                    className={`border border-black  mt-3 px-3 py-2 bg-beige   placeholder-slate-800  md:w-[75%] w-[100%] text-sm focus:outline-none focus:ring-pink focus:border-pink`}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  className={`${styles.button} mt-8 cursor-pointer mx-auto w-[35%]  `}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordActivationPage;
