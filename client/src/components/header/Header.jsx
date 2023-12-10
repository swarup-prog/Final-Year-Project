import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-4">
            <div className="relative ">
              <label className="sr-only" htmlFor="search">
                Search
              </label>

              <input
                className="h-10 w-full rounded-full border-none bg-gray-200 pe-10 ps-4 text-sm shadow-lg sm:w-56 focus-within:border-accent focus-within:ring-1 focus-within:ring-red-500"
                name="search"
                type="search"
                placeholder="Search "
              />

              <button
                type="button"
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-accent p-2 text-gray-600 transition hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <FaMagnifyingGlass color="white" />
              </button>
            </div>

            <a
              href="#"
              className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-lg hover:text-gray-700"
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
