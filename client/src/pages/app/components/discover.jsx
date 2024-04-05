import { useDeferredValue, useEffect, useState } from "react";
import { toastError } from "../../../utils/toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { RiUserAddLine } from "react-icons/ri";

const Discover = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const fetchAllUser = async () => {
    try {
      const response = await axios.get("/user/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const userData = useSelector((state) => state.user.data);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      user.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  const data = searchQuery !== "" ? filteredUsers : users;

  return (
    <div className="px-10 py-10 overflow-y-auto text-secondary">
      <section>
        <div className="flex justify-between items-center">
          <div className="text-xl text-accent font-semibold">Discover</div>
        </div>
      </section>
      <div className="divider divider-accent"></div>

      <section>
        <label className="input input-bordered input-accent flex items-center gap-2 bg-primary">
          <input
            type="text"
            className="grow bg-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 text-secondary"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </section>
      <section>
        {/* map the users to a user card check if it is in user.buddies if yes don't show conect button */}
        {data.map((user) => (
          <div
            className="card bordered flex flex-row justify-between gap-4 p-4 mt-4"
            key={user._id}
          >
            <div className="flex gap-5 justify-center items-center">
              {user?.profileImg ? (
                <img
                  src={user.profileImg}
                  alt="profileImage"
                  width={100}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-3xl font-light text-accent">
                  {user?.name[0]}
                </div>
              )}
              <div className="flex flex-col justify-center items-start">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm">@{user.username}</div>
                <div className="mt-3">{user.bio}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <button className="btn btn-accent text-white">
                <RiUserAddLine />
                Connect
              </button>
              <button className="text-accent font-semibold hover:underline">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Discover;
