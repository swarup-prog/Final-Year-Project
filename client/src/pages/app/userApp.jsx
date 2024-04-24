import { Outlet, useNavigate } from "react-router-dom";
import { CustomButton, Header, UserChatCard } from "../../components";
import { userDashboardRoutes } from "../../routes/userRoutes";
import Tab from "../../components/navigation/Tab";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { fetchUserData } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { getSenderFull } from "../../services/chatLogic";

const UserApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let path = window.location.pathname
    .replace("/app/", "")
    .replace("/chat/", "")
    .replace("-", " ");

  const user = useSelector((state) => state.user.data);
  const chats = useSelector((state) => state.chat.data);

  const handleAcceptBuddyRequest = async (id) => {};

  const handleDeclineBuddyRequest = async (id) => {
    try {
      const response = await axios.patch("/user/cancelBuddyRequest", {
        addedUserId: id,
      });
      console.log(response.data);
      dispatch(fetchUserData());
      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      toastError("Failed to cancel request");
    }
  };

  const [currentPath, setCurrentPath] = useState("");
  const [buddyRequestVisible, setBuddyRequestVisible] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setBuddyRequestVisible(currentPath !== "/app/messages/chat/");
  });

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

  // useEffect(() => {
  //   dispatch(fetchUserData(currentUser._id));
  // }, [updateTrigger]);

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

  if (!user) {
    return (
      <div className="text-secondary w-full h-screen bg-primary">
        <Loading />
      </div>
    );
  }

  return (
    user && (
      <div className="text-secondary w-full h-screen bg-primary">
        <Header />
        <div className="flex w-full bg-ternary lg:h-[91vh]">
          <aside className="bg-primary p-5 flex flex-col justify-start pt-3 md:min-w-[350px] items-center gap-2 md:my-2 rounded-md md:ml-2 ">
            <div className="flex flex-col justify-center items-center gap-4 mb-5">
              <img
                src={user.profileImg}
                alt="profileImage"
                width={200}
                className="rounded-full"
              />

              <div className="flex flex-col justify-center items-center">
                <span className="text-lg font-bold text-secondary">
                  {user?.name}
                </span>
                <span className="text-sm text-secondary">
                  @{user?.username}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.interestedGames?.slice(0, 3).map((game, key) => (
                  <div className="badge badge-primary mr-1" key={key}>
                    {game.name}
                  </div>
                ))}
                {user.interestedGames?.length > 3 && (
                  <div className="badge badge-primary mr-1">
                    + {user.interestedGames?.length - 2} more
                  </div>
                )}
              </div>
            </div>
            {userDashboardRoutes.map((route, k) => {
              return (
                <Tab
                  key={k}
                  title={route.name}
                  onClick={() => navigate(route.path)}
                  icon={route.icon}
                  isActive={route.name.toLowerCase() == path}
                />
              );
            })}
          </aside>

          <section className="p-3 w-full bg-ternary h-[91vh]">
            <div className="bg-primary h-full rounded-md p-2 overflow-y-auto cool-scroll">
              <Outlet />
            </div>
          </section>

          <aside
            className={`flex md:min-w-[450px] max-h-[91vh]  flex-col md:my-2 md:gap-2 md:mr-2 `}
          >
            {/* Friend Request  map data of user.buddyRequest make this and chat take half space in same  aside */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                buddyRequestVisible ? "lg:block" : "hidden"
              } hidden w-full h-full p-4 bg-primary rounded-md`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl text-secondary font-bold">
                  Buddy Requests
                </span>
              </div>
              <div className="divider divider-accent"></div>
              {user?.buddyRequest?.length > 0 ? (
                <div className="flex flex-col w-full justify-between items-center">
                  {user.buddyRequest?.map((buddy) => (
                    <div
                      className="flex justify-between items-center w-full p-2  rounded-md"
                      key={buddy._id}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-12 h-12 bg-ternary rounded-full flex justify-center items-center text-3xl font-light text-accent">
                          {buddy.name[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-accent">
                            {buddy.name}
                          </span>
                          <span className="text-sm text-secondary">
                            {buddy.username}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAcceptBuddyRequest(buddy._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDeclineBuddyRequest(buddy._id)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
                  <span className="text-lg text-accent font-bold">
                    No Buddy Request
                  </span>
                  <button
                    className="btn btn-accent text-white"
                    onClick={() => navigate("/app/discover")}
                  >
                    Add Buddies
                  </button>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className=" transition-all duration-300 ease-in-out bg-primary h-full  overflow-y-auto p-4 rounded-md">
              <div className="flex flex-col gap-2 mt-3 ">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-secondary font-bold">
                    Mesages
                  </span>
                </div>
                <div className="divider divider-accent"></div>

                <div className="flex flex-col gap-2">
                  {chats && chats.length >= 1 ? (
                    chats.map((chat) =>
                      chat.isGroupChat ? (
                        <div
                          key={chat._id}
                          className="border-b border-ternary flex flex-row justify-between gap-4 p-4 mt-4 w-full cursor-pointer hover:bg-ternary hover:border-accent transition duration-300 ease-in-out"
                        >
                          <div className="flex gap-5 justify-center items-center">
                            <div className="w-[60px] h-[60px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-3xl font-light text-accent">
                              {chat.chatName[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-lg font-semibold">
                                {chat.chatName}
                              </span>
                              <span className="text-sm">
                                {chat.users.map((u) => u.name).join(", ")}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-4">
                            <CustomButton
                              title="Message"
                              onClick={() => handleMessageClick(chat)}
                            />
                          </div>
                        </div>
                      ) : (
                        <UserChatCard
                          key={chat._id}
                          id={chat._id}
                          chat={chat}
                          name={getSenderFull(user?._id, chat.users).name}
                          profileImg={
                            getSenderFull(user?._id, chat.users).profileImg
                          }
                          username={
                            getSenderFull(user?._id, chat.users).username
                          }
                        />
                      )
                    )
                  ) : (
                    <span className="text-center">
                      You don't have any messages.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    )
  );
};

export default UserApp;
