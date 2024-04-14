import { BiJoystick } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";

const iconSize = 25;

const adminRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <LuLayoutDashboard size={iconSize} />,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <HiOutlineUsers size={iconSize} />,
  },
  {
    path: "/admin/games",
    name: "Games",
    icon: <BiJoystick size={iconSize} />,
  },
  {
    path: "/admin/news",
    name: "News",
    icon: <FaRegNewspaper size={iconSize} />,
  },
  {
    path: "/admin/reports",
    name: "Reports",
    icon: <MdReportGmailerrorred size={iconSize} />,
  },
];

export default adminRoutes;
