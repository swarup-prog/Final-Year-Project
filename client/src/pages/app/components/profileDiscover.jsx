import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading/loading";
import { useParams } from "react-router-dom";
import { ConnectButton, GameCard } from "../../../components";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";
import { toastError, toastSuccess } from "../../../utils/toast";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TbMessageReport } from "react-icons/tb";

const ProfileDiscover = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`/user/getUserInfo/${userId}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const currentUser = useSelector((state) => state.user.data);

  if (!currentUser || !user) {
    return <Loading />;
  }

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const handleUnfriendBuddy = async (id) => {
    try {
      const response = await axios.patch("/user/unfriendBuddy", {
        buddyId: id,
      });
      console.log(response.data);
      setUpdateTrigger((prev) => !prev);
      fetchUserData();
      dispatch(fetchUserData(currentUser._id));
      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      toastError("Failed to unfriend buddy");
    }
  };

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section className="flex flex-col w-full gap-4">
        <img
          src={user.profileImg}
          alt="profileImage"
          width={200}
          className="rounded-full"
        />

        <div className=" mt-5 flex flex-col justify-center items-start">
          <div className="flex justify-between w-full items-center">
            <span className="text-lg font-bold text-secondary">
              {user?.name}
            </span>
            <span className="font-semibold">
              {user.buddies?.length} Buddies
            </span>
          </div>
          <span className="text-sm text-secondary">@{user?.username}</span>
        </div>
        <div>This is user bio</div>
        <div className="flex justify-end gap-2">
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
                      onClick={() => handleCancelRequest(user._id, "decline")}
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
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisVertical size={25} />}
              bg={"transparent"}
            />

            <MenuList>
              <MenuGroup>
                <MenuItem
                  icon={<LuUserX2 size={17} />}
                  onClick={() => handleUnfriendBuddy(user._id)}
                >
                  Unfriend
                </MenuItem>
                <MenuItem
                  color={"#EF4343"}
                  icon={<TbMessageReport size={17} />}
                  onClick={() => handleReportUser(user._id)}
                >
                  Report
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </section>
      <div className="divider divider-accent"></div>
      <section></section>
      <section>
        <div className="text-xl text-accent font-semibold mb-5">
          Favourite Games
        </div>
        <div className="flex flex-wrap gap-7 justify-center">
          {user.interestedGames?.map((game, k) => (
            <GameCard key={k} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileDiscover;
