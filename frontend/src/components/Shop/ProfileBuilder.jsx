import React, { useState } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../styles/styles";
import Input from "./Layout/Input";
import { loadSeller } from "../../redux/actions/user";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import MultiStepProgressBar from "./Layout/MultiStepProgressBar";

const ProfileBuilderPage = () => {
  const [showDiv, setShowDiv] = useState("first");

  const [businessDetails, setBusinessDetails] = useState({});
  const [sellerDetails, setSellerDetails] = useState({});
  const [businessType, setBusinessType] = useState("business");
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };
  const toggleDiv = (button) => {
    setShowDiv(button);
  };

  return (
    <>
      <div className="flex flex-col  items-center justify-center">
        <div className="text-center text-xl w-full bg-beige py-2  mx-auto border  sm:text-2xl font-medium text-black px-4   border-[#505050] border-b-0 rounded-t-lg   flex justify-around items-center tracking-widest">
          Profile Builder
        </div>
        <div className="border-[#505050]  border-t-0 border w-full">
          <div className="flex flex-row justify-evenly font-semibold py-8 gap-4 text-sm px-2">
            <p
              className={`${
                showDiv === "first" ? "border-b-4 border-pink " : ""
              } cursor-pointer `}
              onClick={() => {
                toggleDiv("first");
              }}
            >
              Business type
            </p>
            {businessType === "business" ? (
              <p
                className={`${
                  showDiv === "second" ? "border-b-4 border-pink " : ""
                } cursor-pointer  `}
                onClick={() => {
                  toggleDiv("second");
                }}
              >
                Business Information
              </p>
            ) : (
              <p
                className={`${
                  showDiv === "third" ? "border-b-4 border-pink " : ""
                } cursor-pointer  `}
                onClick={() => {
                  toggleDiv("third");
                }}
              >
                Seller Account
              </p>
            )}

            <p
              className={`${
                showDiv === "fourth" ? "border-b-4 border-pink " : ""
              } cursor-pointer  `}
              onClick={() => {
                toggleDiv("fourth");
              }}
            >
              Review and confirm
            </p>
          </div>
          {showDiv === "first" && (
            <div className="">
              <BusinessType
                toggleDiv={toggleDiv}
                setBusinessType={setBusinessType}
                businessType={businessType}
              />
            </div>
          )}

          {businessType === "business"
            ? showDiv === "second" && (
                <div className="">
                  <BusinessInformation
                    toggleDiv={toggleDiv}
                    setBusinessDetails={setBusinessDetails}
                  />
                </div>
              )
            : showDiv === "third" && (
                <div className="">
                  <SellerInfo
                    toggleDiv={toggleDiv}
                    setSellerDetails={setSellerDetails}
                  />
                </div>
              )}

          {showDiv === "fourth" && (
            <div className="">
              <ReviewAndConfirm
                toggleDiv={toggleDiv}
                businessType={businessType}
                businessDetails={businessDetails}
                sellerDetails={sellerDetails}
              />
            </div>
          )}
          {/* <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <BusinessType onButtonClick={nextPage} />,
          pagetwo: <BusinessInformation onButtonClick={nextPage} />,
          pagethree: <SellerInfo onButtonClick={nextPage} />,
          pagefour: <ReviewAndConfirm />,
        }[page]
      } */}
        </div>
      </div>
    </>
  );
};
export default ProfileBuilderPage;
const BusinessType = ({ toggleDiv, setBusinessType, businessType }) => {
  const handelForm = (e, type) => {
    e.preventDefault();
    setBusinessType(type);
  };
  return (
    <div className="py-8 px-6">
      <h5 className=" font-semibold">
        Do you operate your business as a legal entitiy?
      </h5>
      <form
        action=""
        className="flex flex-col justify-between py-5"
        onSubmit={handelForm}
      >
        <div className=" flex items-center">
          <input
            type="radio"
            name="businessType"
            id="yes"
            value={"business"}
            className=""
            onChange={(e) => setBusinessType(e.target.value)}
          />

          <label htmlFor="yes" className="pl-5">
            Yes, my business is a legal entitiy
          </label>
        </div>
        <p className="text-[#949393] text-sm mt-2">
          This means you're selling under a registered business, not on your own
          name
        </p>
        <div className=" flex items-center mt-3 ">
          <input
            type="radio"
            name="businessType"
            id="no"
            className="cursor-pointer"
            value={"seller"}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <label htmlFor="no" className="pl-5">
            No, I manage my business as a sole proprietor or owner
          </label>
        </div>

        <p className="text-[#949393] text-sm mt-2">
          This means you’re selling under your own name, not as a registered
          business
        </p>
        <div className="">
          {businessType === "business" ? (
            <input
              type="submit"
              required
              value="Continue"
              className={`${styles.button} mt-8 cursor-pointer mx-auto w-[35%]`}
              onClick={() => {
                toggleDiv("second");
              }}
            />
          ) : (
            <input
              type="submit"
              required
              value="Continue"
              className={`${styles.button} mt-8 cursor-pointer mx-auto w-[35%]`}
              onClick={() => {
                toggleDiv("third");
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
};
const BusinessInformation = ({ toggleDiv, setBusinessDetails }) => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState("");
  const [tradeLicense, setTradeLicense] = useState();
  const [region, setRegion] = useState("");
  const [kifleKetema, setKifleKetema] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [houseNo, setHouseNo] = useState("");

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setTradeLicense(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handelSubmit = () => {
    const currentDetails = {
      name: name,
      tradeLicense: tradeLicense,
      region: region,
      kifleKetema: kifleKetema,
      woreda: woreda,
      kebele: kebele,
      houseNo: houseNo,
    };
    setBusinessDetails(currentDetails);
  };
  return (
    <div className="py-8 px-6">
      <h5 className=" font-semibold">Add your business information</h5>
      <form
        action=""
        className="flex flex-col justify-between py-5 mt-8"
        onSubmit={handelSubmit}
      >
        <Input
          label="Registered business name"
          name="name"
          type="text"
          value={name}
          onChange={(v) => setName(v.target.value)}
        />

        <div className="relative z-0 w-full mb-5">
          <select
            name="select"
            onChange={(e) => setRegion(e.target.value)}
            className="pt-3 select1 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-[#949393] placeholder-slate-800 md:w-[75%] text-[#949393] selection:bg-red"
          >
            <option value="" disabled selected></option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Afar Region">Afar Region</option>
            <option value="Amhara Region">Amhara Region</option>
            <option value="Benishangul-Gumuz Region">
              Benishangul-Gumuz Region
            </option>
            <option value="Dire Dawa">Dire Dawa</option>
            <option value="Gambela Region">Gambela Region</option>
            <option value="Harari Region">Harari Region</option>
            <option value="Oromia Region">Oromia Region</option>
            <option value="Somali Region">Somali Region</option>
            <option value="Southern Nations, Nationalities, and Peoples's Region">
              Southern Nations, Nationalities, and Peoples's Region
            </option>
            <option value="Tigray Region">Tigray Region</option>
          </select>
          <label
            htmlFor="select"
            className="absolute duration-300 top-3 -z-1 origin-0 text-[#949393]"
          >
            Select Your Region
          </label>
          <span className="text-sm text-red-600 hidden" id="error">
            Option has to be selected
          </span>
        </div>
        <Input
          label="Kifle Ketema"
          name="Kifle Ketema"
          type="text"
          value={kifleKetema}
          onChange={(v) => setKifleKetema(v.target.value)}
        />
        <Input
          label="Woreda"
          name="Woreda"
          type="text"
          value={woreda}
          onChange={(v) => setWoreda(v.target.value)}
        />
        <Input
          label="Kebele"
          name="Kebele"
          type="text"
          value={kebele}
          onChange={(v) => setKebele(v.target.value)}
        />
        <Input
          label="House No."
          name="houseNo"
          type="text"
          value={houseNo}
          onChange={(v) => setHouseNo(v.target.value)}
        />

        <div class="grid w-full  items-center gap-1.5">
          <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Trade License
          </label>
          <input
            id="picture"
            type="file"
            onChange={handleImage}
            className="flex h-10   border-0 border-b-2 focus:border-black border-[#949393]  border-input border-gray bg-white px-3 py-2 text-sm text-black file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium md:w-[75%] w-[100%]"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className={`${styles.open_button} rounded-[8px] w-[35%]`}
            onClick={() => {
              toggleDiv("first");
            }}
          >
            Back
          </button>
          <button
            type="button"
            className={`${styles.button} w-[35%]`}
            onClick={() => {
              toggleDiv("fourth");
              handelSubmit(); // Handle the form submission here
            }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

const SellerInfo = ({ toggleDiv, setSellerDetails }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ID, setID] = useState({ type: "", file: "" });

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setID(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handelSubmit = () => {
    const currentDetails = {
      firstName: firstName,
      lastName: lastName,
      region: region,
      city: city,
      address: address,
      ID: ID,
    };

    setSellerDetails(currentDetails);
  };

  return (
    <div className="py-8 px-6">
      <h5 className=" font-semibold">Add your identitiy information</h5>

      <form
        action=""
        className="flex flex-col justify-between gap-4 py-5 mt-8"
        onSubmit={handelSubmit}
      >
        <div className="md:flex md:gap-4 items-center">
          <Input
            label="First Name"
            name="FirstName"
            type="text"
            value={firstName}
            onChange={(v) => setFirstName(v.target.value)}
            required
          />
          <Input
            label="Last Name"
            name="LastName"
            type="text"
            value={lastName}
            onChange={(v) => setLastName(v.target.value)}
            required
          />
        </div>
        <div className="md:flex md:gap-4 items-center">
          <Input
            label="Region"
            name="Region"
            type="text"
            value={region}
            onChange={(v) => setRegion(v.target.value)}
            required
          />
          <Input
            label="City"
            name="City"
            type="text"
            value={city}
            onChange={(v) => setCity(v.target.value)}
            required
          />
        </div>
        <Input
          label="Address"
          name="Address"
          type="text"
          value={address}
          onChange={(v) => setAddress(v.target.value)}
          required
        />
        {/* <Input
          label="PhoneNo"
          name="PhoneNo"
          type="tel"
          value={phone}
          onChange={(v) => setPhone(v.target.value)}
          required
        /> */}
        <div class="grid w-full  items-center gap-1.5">
          <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Identification card (ID)
          </label>
          <input
            id="picture"
            type="file"
            class="flex h-10   border-0 border-b-2 focus:border-black border-[#949393]  border-input border-gray bg-white px-3 py-2 text-sm text-black file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium md:w-[75%] w-[100%]"
            onChange={handleImage}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`${styles.open_button} rounded-[8px] w-[35%]`}
            onClick={() => {
              toggleDiv("second");
            }}
          >
            Back
          </button>
          <button
            type="button"
            className={`${styles.button} w-[35%]`}
            onClick={() => {
              toggleDiv("fourth");
              handelSubmit(); // Handle the form submission here
            }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewAndConfirm = ({
  toggleDiv,
  businessType,
  sellerDetails,
  businessDetails,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(businessType);
    if (businessType === "business") {
      await axios
        .put(
          `${server}/shop/update-business-details`,
          {
            name: businessDetails.name,
            region: businessDetails.region,
            kifleKetema: businessDetails.kifleKetema,
            woreda: businessDetails.woreda,
            kebele: businessDetails.kebele,
            houseNo: businessDetails.houseNo,
            tradeLicense: businessDetails.tradeLicense,
            businessType,
            verifyRequest: true,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Profile details updated succesfully!");
          dispatch(loadSeller());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else if (businessType === "seller") {
      await axios
        .put(
          `${server}/shop/update-seller-details`,
          {
            firstname: sellerDetails.firstname,
            lastName: sellerDetails.lastName,
            region: sellerDetails.region,
            city: sellerDetails.city,
            address: sellerDetails.address,
            ID: sellerDetails.ID,
            businessType,
            verifyRequest: true,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Profile details updated succesfully!");
          dispatch(loadSeller());
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  console.log(businessType, "here");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="py-8 px-6">
      <h5 className=" font-bold text-lg tracking-[0.8px] pb-2">
        Review and confirm
      </h5>
      <p className="">
        Before you finish, please make sure your account info is accurate.
      </p>

      <div className="my-8">
        {businessType === "business" && (
          <div className="">
            <h5 className="font-bold text-lg tracking-[0.8px] pb-2">
              Business details{" "}
            </h5>
            <div className="grid grid-cols-2 grid-rows-5 gap-4 w-[90%]">
              <span className="text-[#949393] w-[120px]">Business Name</span>
              <span className="">{businessDetails.name}</span>

              <span className="text-[#949393] w-[120px]">Region</span>
              <span className="">{businessDetails.region}</span>

              <span className="text-[#949393] w-[120px]">Kifle Ketema</span>
              <span className="">{businessDetails.kifleKetema}</span>

              <span className="text-[#949393] w-[120px]">Woreda</span>
              <span className="">{businessDetails.woreda}</span>

              <span className="text-[#949393] w-[120px]">Kebele</span>
              <span className="">{businessDetails.kebele}</span>

              <span className="text-[#949393] w-[120px]">House Number</span>
              <span className="">{businessDetails.houseNo}</span>
              <span className="text-[#949393] w-[120px]">Trade License</span>
              {businessDetails.tradeLicense ? (
                <>
                  <img
                    src={businessDetails.tradeLicense}
                    alt=" trade license"
                    className="w-[100px] cursor-pointer"
                    onClick={handleImageClick}
                  />
                  <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute right-0"
                    >
                      <AiOutlineClose />
                    </button>
                    <img
                      src={businessDetails.tradeLicense}
                      alt="Trade License"
                      className="w-full"
                    />
                  </ReactModal>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="mt-8">
              <p
                className="text-[#00f] cursor-pointer "
                onClick={() => {
                  toggleDiv("second");
                }}
              >
                Edit Business details
              </p>
            </div>
          </div>
        )}

        {businessType === "seller" && (
          <div className="">
            <h5 className="font-bold text-lg tracking-[0.8px] pb-2">
              Seller details{" "}
            </h5>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">First Name</span>
              <span className="">{sellerDetails.firstName} </span>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">Last Name</span>
              <span className="">{sellerDetails.lastName} </span>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">Region</span>
              <span className="">{sellerDetails.region}</span>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">City</span>
              <span className="">{sellerDetails.city}</span>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">address</span>
              <span className="">{sellerDetails.address}</span>
            </div>

            <div className="grid grid-cols-2 grid-rows-1 gap-4 py-2">
              <span className="text-[#949393]">ID</span>
              {sellerDetails.ID ? (
                <>
                  <img
                    src={sellerDetails.ID}
                    alt=" trade license"
                    className="w-[100px] cursor-pointer"
                    onClick={handleImageClick}
                  />
                  <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute right-0"
                    >
                      <AiOutlineClose />
                    </button>
                    <img
                      src={sellerDetails.ID}
                      alt="Trade License"
                      className="w-full"
                    />
                  </ReactModal>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="mt-8">
              <p
                className="text-[#00f] "
                onClick={() => {
                  toggleDiv("third");
                }}
              >
                Edit Seller details
              </p>
            </div>
          </div>
        )}

        <div className="">
          <form onSubmit={handleSubmit}>
            {/* Rest of the code... */}
            <div className="">
              <input
                type="submit"
                required
                value="Submit"
                className={`${styles.button} mt-8 cursor-pointer mx-auto w-[30%] `}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
