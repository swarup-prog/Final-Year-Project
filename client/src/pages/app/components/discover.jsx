import { useDeferredValue, useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RiUserAddLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { fetchUserData } from "../../../features/auth/authSlice";

const Discover = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const currentUser = useSelector((state) => state.user.data);

  const [updateTrigger, setUpdateTrigger] = useState(false);

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
  }, [updateTrigger]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      user.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  const handleBuddyRequest = async (id) => {
    try {
      // make a post request to send a buddy request
      const response = await axios.patch("/user/sendBuddyRequest", {
        addedUserId: id,
      });
      console.log(response.data);
      toastSuccess(response.data.message);
      setUpdateTrigger((prev) => !prev);
      dispatch(fetchUserData());
    } catch (error) {
      console.log(error);
      toastError("Failed to send buddy request");
    }
  };

  const handleCancelRequest = async (id) => {
    try {
      const response = await axios.patch("/user/cancelBuddyRequest", {
        addedUserId: id,
      });
      console.log(response.data);
      setUpdateTrigger((prev) => !prev);
      dispatch(fetchUserData());
      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      toastError("Failed to cancel request");
    }
  };

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
          <Icon as={BiSearchAlt} boxSize={7} />
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
              {
                /* check if user is already a buddy or not */
                currentUser?.buddies.some((buddy) => buddy._id === user._id) ? (
                  <button className="btn btn-accent text-white w-[130px]">
                    <LuUserCheck2 size={25} />
                    Buddy
                  </button>
                ) : currentUser?.pendingRequest.some(
                    (request) => request._id === user._id
                  ) ? (
                  <button
                    className="btn btn-accent text-white w-[130px]"
                    onClick={() => handleCancelRequest(user._id)}
                  >
                    <LuUserX2 size={25} />
                    Cancel
                  </button>
                ) : (
                  <button
                    className="btn btn-accent text-white w-[130px]"
                    onClick={() => handleBuddyRequest(user._id)}
                  >
                    <RiUserAddLine size={25} />
                    Connect
                  </button>
                )
              }

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
