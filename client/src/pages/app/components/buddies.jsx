import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuUserX2 } from "react-icons/lu";
import { BuddyListItem } from "../../../components";

const Buddies = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">
          Your Gaming Buddies
        </div>
      </section>
      <div className="divider divider-accent"></div>
      {user?.pendingRequest.length > 0 && (
        <>
          <section>
            <div className="text-lg text-accent font-semibold">
              Pending Requests
            </div>

            <div>
              {user?.pendingRequest.map((req) => (
                <div
                  className="card bordered flex flex-row justify-between gap-4 p-4 mt-4"
                  key={req._id}
                >
                  <div className="flex gap-5 justify-center items-center">
                    {req?.profileImg ? (
                      <img
                        src={req.profileImg}
                        alt="profileImage"
                        width={100}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-[60px] h-[60px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-3xl font-light text-accent">
                        {req?.name[0]}
                      </div>
                    )}
                    <div className="flex flex-col justify-center items-start">
                      <div className="text-lg font-semibold">{req.name}</div>
                      <div className="text-sm">@{req.username}</div>
                      <div className="mt-3">{req.bio}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <button className="btn btn-accent text-white">
                      <LuUserX2 />
                      Cancel
                    </button>
                    <button className="text-accent font-semibold hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="divider divider-accent"></div>
        </>
      )}
      <section>
        {user?.buddies.length > 0 ? (
          <div>
            {user.buddies.map((buddy, k) => (
              <BuddyListItem buddy={buddy} key={k} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-8 mt-20">
            <span className="text-center">
              You have no buddy.
              <br />
              Search for buddies to play with?
            </span>
            <div
              className="btn btn-accent text-white"
              onClick={() => navigate("/app/discover")}
            >
              Search for buddies
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Buddies;
