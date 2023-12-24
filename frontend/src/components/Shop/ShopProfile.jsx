import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBuilderPage from "./ProfileBuilder";
import { server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import {
  FaFacebook,
  FaTelegram,
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LoginSocialGoogle } from "reactjs-social-login";
function ShopProfile({ active }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[90%] flex-col justify-center my-5">
        {active === 3 && (
          <div>
            <ChangePassword />
          </div>
        )}
        {active === 1 && (
          <div>
            <ShopDetail />
          </div>
        )}
        {active === 2 && (
          <div>
            <ProfileBuilderPage />
          </div>
        )}
        {active === 4 && (
          <div>
            <SocialAccounts />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopProfile;

const ShopDetail = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="relative">
          {seller?.avatar?.url ? (
            <img
              src={seller.avatar.url}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-black"
              alt=""
            />
          ) : (
            <Avatar
              name={seller.name}
              className="w-[150px] h-[150px]  text-5xl "
              round={true}
              style={{ fontSize: "24px" }}
            />
          )}
          <div className="w-[30px] h-[30px] bg-pink rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera className="text-white font-semibold absolute top-[7px] left-[7px]" />
            </label>
          </div>
        </div>
      </div>

      {/* shop info */}
      <form className="flex flex-col items-center" onSubmit={updateHandler}>
        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2">Shop Name</label>
          </div>
          <input
            type="name"
            placeholder={`${seller.name}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>
        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2">Shop description</label>
          </div>
          <input
            type="name"
            placeholder={`${
              seller?.description
                ? seller.description
                : "Enter your shop description"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>
        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2">Shop Address</label>
          </div>
          <input
            type="name"
            placeholder={seller?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2">Shop Phone Number</label>
          </div>
          <input
            type="tel"
            placeholder={seller?.phoneNumber}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2">Shop Zip Code</label>
          </div>
          <input
            type="number"
            placeholder={seller?.zipCode}
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5 ">
          <input
            type="submit"
            value="Update Shop"
            className={`${styles.button} !w-[95%] mb-4 800px:mb-0 pt-2 pb-2`}
            required
            readOnly
          />
        </div>
      </form>
    </>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-shop-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="flex flex-col  items-center justify-center">
        <p className="text-center text-xl w-full bg-beige py-2  mx-auto border  sm:text-2xl font-medium text-black px-4   border-[#505050] border-b-0 rounded-t-lg   flex justify-around items-center tracking-widest">
          {" "}
          Change Password
        </p>
        <div className="w-full flex items-center justify-center border border-[#505050]  border-t-0  ">
          <form
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center w-full"
          >
            <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Enter your old password</label>
              </div>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-3">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Enter your new password</label>
              </div>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[80%] mt-3">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">
                  Enter your confirm password
                </label>
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-full">
              <input
                className={`${styles.button} mt-8 cursor-pointer mx-auto w-[35%]  `}
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const SocialAccounts = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  const googleRef = useRef();
  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);
  return (
    <>
      <div className="">
        <div className="text-center text-xl w-full bg-beige py-2  mx-auto border  sm:text-2xl font-medium text-black px-4   border-[#505050] border-b-0 rounded-t-lg   flex justify-around items-center tracking-widest">
          Social Accounts
        </div>
        <div className="border-[#505050]  border-t-0 border">
          <p className="text-center py-2 md:text-lg ">
            Add your <strong>social accounts</strong> for users to find you
          </p>
          <LoginSocialGoogle
            ref={googleRef}
            client_id="731375560582-6o2skhnk0e8bnkheg2h7n1u4887buvof.apps.googleusercontent.com"
            onLogoutFailure={onLogoutFailure}
            onLoginStart={onLoginStart}
            onLogoutSuccess={onLogoutSuccess}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              console.log("data", data);
              console.log("provider", provider);
              const googleId = data.sub;
              console.log("Google ID:", googleId);
              const email = data.email;
              console.log("Email:", email);
            }}
            scope="profile email"
            onReject={(err) => {
              console.log("hbhbdhd", err);
            }}
          >
            <p className="text-pink">google log in</p>
          </LoginSocialGoogle>
          <div className="flex flex-col items-start p-8 gap-4">
            <div className="py-2 flex item-center gap-6">
              <FaFacebook size={30} />
              <p className="">ADD</p>
            </div>
            <div className="py-2 flex item-center gap-6">
              <FaInstagram size={30} />
              <p className="">ADD</p>
            </div>
            <div className="py-2 flex item-center gap-6">
              <FaXTwitter size={30} />
              <p className="">ADD</p>
            </div>
            <div className="py-2 flex item-center gap-6">
              <FaTelegram size={30} />
              <p className="">ADD</p>
            </div>

            <div className="py-2 flex item-center gap-6">
              <FaWhatsapp size={30} />
              <p className="">ADD</p>
            </div>

            <div className="py-2 flex item-center gap-6">
              <FaTiktok size={30} />
              <p className="">ADD</p>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};
