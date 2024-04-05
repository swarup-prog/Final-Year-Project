import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo-red-trans.png";
import { BiLogOut } from "react-icons/bi";
import { clearUserData } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiDark, CiLight } from "react-icons/ci";
import { toggleTheme } from "../../features/theme/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleTooggleTheme = () => {
    dispatch(toggleTheme());
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutClickHandler = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <header className="bg-primary">
      <div className="max-w-screen px-4 py-8  sm:flex sm:justify-between">
        <img
          src={logo}
          alt="Gamer Connect"
          width={200}
          className="hidden sm:block"
        />
        <div className="flex items-center justify-end gap-4">
          <span
            aria-hidden="true"
            className="block h-6 w-px rounded-full bg-gray-200"
          ></span>

          <span className="block shrink-0" onClick={toggleDropdown}>
            <span className="sr-only">Profile</span>
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />
          </span>
          {isOpen && (
            <div className="absolute top-20 end-2 z-10 mt-3 w-56 divide-y divide-ternary rounded-md border border-ternary bg-primary shadow-lg transition-transform duration-300 ease-in-out transform translate-y-2">
              <div className="p-2">
                <span
                  className="cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-secondary hover:bg-ternary "
                  onClick={handleTooggleTheme}
                >
                  {!isDarkMode ? (
                    <CiLight size={25} />
                  ) : (
                    <CiDark size={25} color="white" />
                  )}
                  Change Theme
                </span>
                <span
                  className=" cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-ternary  hover:text-red-700"
                  onClick={logoutClickHandler}
                >
                  <BiLogOut className={`h-4 w-4 mr-2`} />
                  Logout
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
