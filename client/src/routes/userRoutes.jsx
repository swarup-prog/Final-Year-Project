import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { CgCommunity } from "react-icons/cg";
import { BiHomeAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";

const iconSize = 25;

const userRoutes = [
  {
    path: "/app/home",
    name: "Home",
    icon: <BiHomeAlt size={iconSize} />,
  },
  {
    path: "/app/discover",
    name: "Discover",
    icon: <FaMagnifyingGlass size={iconSize} />,
  },
  {
    path: "/app/buddies",
    name: "Buddies",
    icon: <TbUsers size={iconSize} />,
  },
  {
    path: "/app/messages",
    name: "Messages",
    icon: <BsChatDots size={iconSize} />,
  },
  {
    path: "/app/notifications",
    name: "Notifications",
    icon: <FaRegBell size={iconSize} />,
  },
  {
    path: "/app/profile",
    name: "Profile",
    icon: <FaRegUser size={iconSize} />,
  },
  {
    path: "/app/communities",
    name: "Communities",
    icon: <CgCommunity size={iconSize} />,
  },
];

export default userRoutes;
