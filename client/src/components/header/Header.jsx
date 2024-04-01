import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import logo from "../../assets/logo-red-trans.png";

const Header = () => {
  const navigate = useNavigate();

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
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="block shrink-0 rounded-full bg-primary p-2.5 text-gray-600 shadow-lg hover:text-gray-700 shadow-accent"
            >
              <span className="sr-only">Notifications</span>
              <FaRegBell />
            </a>
          </div>

          <span
            aria-hidden="true"
            className="block h-6 w-px rounded-full bg-gray-200"
          ></span>

          <a href="#" className="block shrink-0">
            <span className="sr-only">Profile</span>
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
