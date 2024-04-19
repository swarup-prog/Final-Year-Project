import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { userDashboardRoutes } from "../../routes/userRoutes";
import Tab from "../../components/navigation/Tab";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { fetchUserData } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";

const UserApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = window.location.pathname.replace("/app/", "").replace("-", " ");

  const user = useSelector((state) => state.user.data);

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
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setRightSidebarVisible(currentPath !== "/app/messages/chat/");
  });

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
                <span className="text-lg font-bold text-accent">
                  {user?.name}
                </span>
                <span className="text-sm text-secondary">
                  @{user?.username}
                </span>
              </div>
              <div>
                {user.interestedGames?.map((game, key) => (
                  <div className="badge badge-primary mr-1" key={key}>
                    {game.name}
                  </div>
                ))}
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
            <div className="bg-primary h-full rounded-md p-2">
              <Outlet />
            </div>
          </section>

          <aside
            className={`${
              rightSidebarVisible ? "lg:flex" : "hidden"
            } md:min-w-[450px] max-h-[91vh] hidden  flex-col md:my-2 md:gap-2 md:mr-2 `}
          >
            {/* Friend Request  map data of user.buddyRequest make this and chat take half space in same  aside */}
            <div className="w-full h-full p-2 bg-primary rounded-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl text-accent font-bold">
                  Buddy Requests
                </span>
              </div>
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

            {/* Chat */}
            <div className="bg-primary h-full  overflow-y-auto p-2 rounded-md">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-accent font-bold">Chat</span>
                  <button className="btn btn-primary">New Chat</button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-12 bg-ternary rounded-full flex justify-center items-center text-3xl font-light text-accent">
                        A
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-accent">
                          Alex
                        </span>
                        <span className="text-sm text-secondary">
                          Hey, how are you?
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-secondary">12:30 PM</div>
                  </div>
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
