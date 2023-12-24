import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import ProfileSidebar from "../../src/components/Profile/ProfileSidebar.jsx";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div
            className={`flex bg-beige py-10 relative top-20`}
          >
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
