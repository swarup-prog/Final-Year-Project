import { useDeferredValue, useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import {
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { fetchUserData } from "../../../features/auth/authSlice";
import { ConnectButton } from "../../../components";

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
      user.username?.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      user.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  console.log(currentUser?.buddies, "buddies");

  const handleBuddyRequest = async (id) => {
    try {
      // make a post request to send a buddy request
      const response = await axios.patch("/user/sendBuddyRequest", {
        userId: currentUser._id,
        addedUserId: id,
      });
      console.log(response.data);
      toastSuccess(response.data.message);
      setUpdateTrigger((prev) => !prev);
      dispatch(fetchUserData(currentUser._id));
    } catch (error) {
      console.log(error);
      toastError("Failed to send buddy request");
    }
  };

  const handleAcceptRequest = async (id) => {
    try {
      const response = await axios.patch("/user/acceptBuddyRequest", {
        addedUserId: id,
      });
      console.log(response.data);
      setUpdateTrigger((prev) => !prev);
      dispatch(fetchUserData(currentUser._id));
      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      toastError("Failed to accept request");
    }
  };

  const handleCancelRequest = async (id, type) => {
    try {
      const response = await axios.patch("/user/cancelBuddyRequest", {
        addedUserId: id,
        type: type,
      });
      console.log(response.data);
      setUpdateTrigger((prev) => !prev);
      dispatch(fetchUserData(currentUser._id));
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
          <div className="text-xl text-secondary font-semibold">Discover</div>
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
            className="border-b border-ternary flex flex-row justify-between gap-4 p-4 mt-4"
            key={user._id}
          >
            <div className="flex gap-5 justify-center items-center">
              <img
                src={user.profileImg}
                alt="profileImage"
                width={100}
                className="rounded-full"
              />

              <div className="flex flex-col justify-center items-start">
                <div
                  className={`text-lg font-semibold cursor-pointer hover:text-accent`}
                >
                  {user.name}
                </div>
                <div className="text-sm">@{user.username}</div>
                <div className="mt-3">
                  {user.interestedGames?.map((game, key) => (
                    <div className="badge badge-primary mr-2" key={key}>
                      {game.name}
                    </div>
                  ))}
                </div>
                <div className="mt-3">{user.bio}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              {
                /* check if user is already a buddy or not */
                currentUser?.buddies.some((buddy) => buddy._id === user._id) ? (
                  <ConnectButton
                    title={"Buddy"}
                    icon={<LuUserCheck2 size={25} />}
                  />
                ) : currentUser?.pendingRequest.some(
                    (request) => request._id === user._id
                  ) ? (
                  <ConnectButton
                    title={"Cancel"}
                    icon={<LuUserX2 size={25} />}
                    onClick={() => handleCancelRequest(user._id, "cancel")}
                  />
                ) : currentUser?.buddyRequest.some(
                    (request) => request._id === user._id
                  ) ? (
                  <Menu>
                    <MenuButton>
                      <ConnectButton
                        title={"Respond"}
                        icon={<RiUserSharedLine size={25} />}
                      />
                    </MenuButton>

                    <MenuList>
                      <MenuGroup>
                        <MenuItem
                          icon={<LuUserCheck2 size={17} />}
                          onClick={() => handleAcceptRequest(user._id)}
                        >
                          Accept
                        </MenuItem>
                        <MenuItem
                          icon={<LuUserX2 size={17} />}
                          color={"#EF4343"}
                          onClick={() =>
                            handleCancelRequest(user._id, "decline")
                          }
                        >
                          Decline
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <ConnectButton
                    title={"Connect"}
                    icon={<RiUserAddLine size={25} />}
                    onClick={() => handleBuddyRequest(user._id)}
                  />
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
