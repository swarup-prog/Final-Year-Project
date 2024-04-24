import { useSelector } from "react-redux";
import { GameCard } from "../../../components";

const Profile = () => {
  const user = useSelector((state) => state.user.data);

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
              {user?.buddies.length} Buddies
            </span>
          </div>
          <span className="text-sm text-secondary">@{user?.username}</span>
        </div>
        <div>This is user bio</div>
        <div className="flex justify-end gap-2">
          <div className="btn  btn-outline btn-accent">Edit Profile</div>
          <div className="btn  btn-outline btn-accent">Share Profile</div>
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

export default Profile;
