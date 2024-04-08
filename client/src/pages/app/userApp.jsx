import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { userDashboardRoutes } from "../../routes/userRoutes";
import Tab from "../../components/navigation/Tab";
import { useSelector } from "react-redux";

const UserApp = () => {
  const navigate = useNavigate();
  const path = window.location.pathname.replace("/app/", "").replace("-", " ");

  const user = useSelector((state) => state.user.data);

  return (
    <div className="text-secondary w-full h-screen bg-primary">
      <Header />
      <div className="flex w-full">
        <aside className="bg-primary p-5 flex flex-col justify-start pt-3 md:min-w-[350px] items-center gap-2">
          {/* <ThemeSwitchButton /> */}
          <div className="flex flex-col justify-center items-center gap-4 mb-5">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt="profileImage"
                width={200}
                className="rounded-full"
              />
            ) : (
              <div className="w-[200px] h-[200px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-8xl font-light text-accent">
                {user?.name[0]}
              </div>
            )}
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg font-bold text-accent">
                {user?.name}
              </span>
              <span className="text-sm text-secondary">@{user?.username}</span>
            </div>
            <div>
              {user?.interestedGames.map((game, key) => (
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
        <section className="p-3 w-full bg-ternary h-[89vh]">
          <div className="bg-primary h-full rounded-md overflow-y-auto p-2">
            <Outlet />
          </div>
        </section>
        <aside className="md:min-w-[450px] hidden lg:flex  flex-col p-5">
          {/* Friend Request  map data of user.buddyRequest make this and chat take half space in same  aside */}
          <div className="w-full h-full p-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl text-accent font-bold">
                Buddy Requests
              </span>
            </div>
            {user?.buddyRequest.length > 0 ? (
              <div className="flex flex-col w-full justify-between items-center">
                {user?.buddyRequest.map((buddy) => (
                  <div
                    className="flex justify-between items-center w-full p-2  rounded-md"
                    key={buddy.id}
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
                      <button className="btn btn-primary">Accept</button>
                      <button className="btn btn-secondary">Decline</button>
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
          <div className="divider divider-accent"></div>
          {/* Chat */}
          <div className="bg-primary h-full  overflow-y-auto p-2">
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
  );
};

export default UserApp;
