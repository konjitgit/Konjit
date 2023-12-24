import React, { useState } from "react";
import Header from "../components/Layout/Header";

import Loader from "../components/Layout/Loader";
import ProfileSide from "../components/Profile/profileSide";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(5);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div
            className={`mx-auto  flex  flex-col sm:flex-row sm:gap-8 py-10 sm:px-4 h-screen mb-8 overflow-y-auto  relative top-20`}
          >
            <div className="sm:w-[25%] w-[90%]  sticky mx-auto 800px:mt-0 mt-[18%] mb-3  ">
              {/* <ProfileSideBar active={active} setActive={setActive} /> */}
              <ProfileSide active={active} setActive={setActive} />
            </div>
            <div className=" sticky 800px:mt-0 md:w-[50%] w-[90%] mt-[18%] mx-auto">
              <Profile active={active} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
