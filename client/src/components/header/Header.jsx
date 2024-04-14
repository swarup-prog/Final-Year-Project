import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo-red-trans.png";
import { BiLogOut } from "react-icons/bi";
import { clearUserData } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiDark, CiLight } from "react-icons/ci";
import { toggleTheme } from "../../features/theme/themeSlice";
import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toggleColorMode } = useColorMode();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  const user = useSelector((state) => state.user.data);

  return (
    <header className="bg-primary">
      <div className="max-w-screen px-4 py-8 md:px-10  sm:flex sm:justify-between">
        <img
          src={logo}
          alt="Gamer Connect"
          width={200}
          className="hidden sm:block"
        />

        <Menu>
          <Tooltip label="Profile" aria-label="Profile">
            <MenuButton
              as={Avatar}
              size={"sm"}
              src={user?.profileImg ?? "https://bit.ly/dan-abramov"}
            />
          </Tooltip>

          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem
                icon={<Icon as={isDarkMode ? CiDark : CiLight} />}
                onClick={toggleColorMode}
              >
                Change Theme
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem
                color={"red"}
                icon={<Icon as={BiLogOut} />}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
