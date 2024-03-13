import { useState } from "react";
import { useSelector } from "react-redux";
import Tab from "./Tab";
import CustomButton from "../buttons/CustomButton";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiJoystick } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa6";

import "../../App.css";

const SideNavigation = () => {
  const user = useSelector((state) => state.user.data);

  const tab = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Dashboard");

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("adminActiveTab", tabTitle);
  };

  const handleLogout = () => {
    localStorage.clear();
    // dispatch(clearUserData());
  };

  return (
    <aside className="left-0items-center flex-col gap-2 flex-initial w-52 md:w-80 dashboard-section justify-between h-[890px]">
      <div className="w-full flex flex-col gap-2">
        {user && user.role === "admin" ? (
          <>
            <Tab
              title={"Dashboard"}
              icon={<LuLayoutDashboard size={25} />}
              onClick={handleTabClick}
              isActive={activeTab === "Dashboard"}
            />
            <Tab
              title={"Users"}
              onClick={handleTabClick}
              icon={<HiOutlineUsers size={25} />}
              isActive={activeTab === "Users"}
            />
            <Tab
              title={"Games"}
              onClick={handleTabClick}
              icon={<BiJoystick size={25} />}
              isActive={activeTab === "Games"}
            />
            <Tab
              title={"News"}
              onClick={handleTabClick}
              icon={<FaRegNewspaper size={25} />}
              isActive={activeTab === "News"}
            />
          </>
        ) : (
          <>
            <Tab
              title={"Feed"}
              icon={<LuLayoutDashboard size={25} />}
              onClick={handleTabClick}
              isActive={activeTab === "Dashboard"}
            />
            <Tab
              title={"Discover"}
              onClick={handleTabClick}
              icon={<HiOutlineUsers size={25} />}
              isActive={activeTab === "Users"}
            />
            <Tab
              title={"Friends"}
              onClick={handleTabClick}
              icon={<BiJoystick size={25} />}
              isActive={activeTab === "Friends"}
            />
            <Tab
              title={"Communities"}
              onClick={handleTabClick}
              icon={<FaRegNewspaper size={25} />}
              isActive={activeTab === "Communities"}
            />
          </>
        )}
      </div>

      <CustomButton
        title="Logout"
        onClick={handleLogout}
        className={`w-full h-[48px] justify-center items-center`}
      />
    </aside>
  );
};

export default SideNavigation;
