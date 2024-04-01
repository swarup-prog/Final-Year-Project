import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";

const iconSize = 25;

const userRoutes = [
  {
    path: "/app",
    name: "Feed",
    icon: "",
  },
  {
    path: "/app/discover",
    name: "Discover",
    icon: <FaMagnifyingGlass />,
  },
  {
    path: "/app/friends",
    name: "Friends",
    icon: <MdPeople />,
  },
  {
    path: "/app/communities",
    name: "Communities",
    icon: <CgCommunity />,
  },
];

export default userRoutes;
