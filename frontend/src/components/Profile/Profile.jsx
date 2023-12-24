import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Avatar from "react-avatar";
import Loader from "../Layout/Loader";
function Profile({ active }) {
  return (
    <div>
      {/* account details */}
      {/* profile */}
      {active === 5 && (
        <div>
          <UserDetail />
        </div>
      )}
      {/* Address book */}
      {active === 6 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

const UserDetail = () => {
  const { user, error, success } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const [showDiv, setShowDiv] = useState("first");

  // The function to toggle the display status of the div
  const toggleDiv = (button) => {
    setShowDiv(button);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Information updated Successfully!");
    }
  }, [error, success]);
  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error("Couldn't update Avatar try again");
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <>
          <div className="bg-beige text-center text-3xl sm:text-4xl font-medium text-black px-4 py-2  border-[#505050] border-b-0 rounded-t-lg  border flex justify-around items-center uppercase">
            account details
          </div>

          <div className="border-[#505050]  border-t-0 border ">
            <div className="flex flex-row justify-evenly font-semibold py-8">
              <p
                className={`${
                  showDiv === "first" ? "border-b-4 border-pink " : ""
                } cursor-pointer `}
                onClick={() => {
                  toggleDiv("first");
                }}
              >
                Personal Details
              </p>
              <p
                className={`${
                  showDiv === "second" ? "border-b-4 border-pink " : ""
                } cursor-pointer  `}
                onClick={() => {
                  toggleDiv("second");
                }}
              >
                Change Your Password
              </p>
            </div>

            {showDiv === "first" && (
              <div className=" mx-auto py-8 px-6">
                <>
                  <div className="flex justify-center w-full">
                    <div className="relative">
                      {user?.avatar?.url ? (
                        <img
                          src={user.avatar.url}
                          className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                          alt=""
                        />
                      ) : (
                        <Avatar
                          name={user.name}
                          className="w-[150px] h-[150px]  text-5xl "
                          round={true}
                          style={{ fontSize: "24px" }}
                        />
                      )}
                      <div className="w-[30px] h-[30px] bg-pink rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                        <input
                          type="file"
                          id="image"
                          className="hidden absolute bg-red-900"
                          onChange={handleImage}
                        />
                        <label htmlFor="image">
                          <AiOutlineCamera className="text-white font-semibold absolute top-[7px] left-[7px]" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className=" px-5 mx-auto">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-between "
                    >
                      <div className=" flex items-center justify-between  pb-4">
                        <label className="w-[15%]">Name</label>
                        <input
                          type="text"
                          className={`border border-black  mt-3 px-3 py-2 bg-beige   placeholder-slate-800  md:w-[75%] text-sm focus:outline-none focus:ring-pink focus:border-pink`}
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className=" flex  items-center justify-between pb-4  ">
                        <label className="w-[15%]">Email Address</label>
                        <input
                          type="text"
                          className={`border border-black  mt-3 px-3 py-2 md:w-[75%] bg-beige   placeholder-slate-800   text-sm focus:outline-none focus:ring-pink focus:border-pink `}
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className=" flex  items-center justify-between pb-4">
                        <label className="w-[15%]">Phone Number</label>
                        <input
                          type="tel"
                          className={`border border-black  mt-3 px-3 py-2 bg-beige md:w-[75%]   placeholder-slate-800   text-sm focus:outline-none focus:ring-pink focus:border-pink`}
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>

                      <div className=" flex items-center justify-between  pb-4">
                        <label className="w-[15%]">Enter your password</label>
                        <input
                          type="password"
                          className={`border border-black  mt-3 px-3 py-2 bg-beige md:w-[75%]   placeholder-slate-800   text-sm focus:outline-none focus:ring-pink focus:border-pink `}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <input
                        className={`${styles.button} mt-8 cursor-pointer mx-auto w-[35%]`}
                        required
                        value="Save Details"
                        type="submit"
                      />
                    </form>
                  </div>
                </>
              </div>
            )}

            {showDiv === "second" && (
              <div className="">
                <ChangePassword />
              </div>
            )}
          </div>
        </>
      )}
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
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Password Updated Successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error("Couldn't update password try again");
      });
  };
  return (
    <div className="mx-auto py-8 px-6">
      <div className="px-5 mx-auto">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col justify-between"
        >
          <div className="w-[100%] 620px:flex 620px:items-center 620px:justify-between gap-3  pb-4">
            <label className="">Enter your old password</label>
            <input
              type="password"
              className={`border border-black  mt-3 px-3 py-2 bg-beige   placeholder-slate-800  md:w-[75%] w-[100%] text-sm focus:outline-none focus:ring-pink focus:border-pink`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
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
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(country, city, address1, address2, addressType)
      );
      toast("Address updated");
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");

      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full ">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[80%] 620px:w-[40%] h-[80vh] bg-white rounded shadow relative top-20  ">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4 ">
                  {/* country */}
                  <div className="w-full pb-2 ">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border border-black h-[40px]  px-3 bg-beige"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* city */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border border-black  h-[40px]  px-3 bg-beige"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* address1 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[95%]`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  {/* address2 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[95%]`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  {/* zip code */}
                  {/* <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div> */}

                  {/*address type  */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border border-black h-[40px]  px-3 bg-beige"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* submit */}
                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.button} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="bg-beige text-center text-3xl sm:text-4xl font-medium text-black px-4 py-4  border-[#505050]  rounded-t-lg border-b-0 border flex justify-around items-center uppercase">
        My Addresses
      </div>
      <div className="border-[#505050]   border border-t-0  ">
        <div
          className={`${styles.button} float-right  w-[40%] sm:w-[30%] mr-1 px-4 text-sm 620px:text-base my-8`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
        <br />
        {user &&
          user.addresses.map((item, index) => (
            <div
              className="w-[95%] bg-white py-2 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow border-black border mx-auto justify-between  mb-5"
              key={index}
            >
              <div className="flex items-center">
                <h5 className="pl-3 font-[600]">{item.addressType}</h5>
              </div>
              <div className="md:pl-8 pl-3 flex items-center">
                <h6 className="text-[12px] 800px:text-base">
                  {item.address1} {item.address2}
                </h6>
              </div>
              {/* <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div> */}
              <div className="min-w-[10%] flex items-center justify-between pl-8 ">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDelete(item)}
                  className="mr-3 cursor-pointer hover:text-red-700"
                  title="Delete Address"
                />
              </div>
            </div>
          ))}

        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    </div>
  );
};

export default Profile;
