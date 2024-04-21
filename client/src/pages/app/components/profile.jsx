import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section className="flex flex-col w-full gap-4">
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
            <div
              key={k}
              className={`card w-96 bg-primary border border-accent cursor-pointer`}
              onClick={() => handleCardClick(game._id)}
            >
              <figure className="w-[385px] h-[220px]">
                <img src={game.image} alt="Game Iamge" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{game.name}</h2>
                <span className="flex flex-wrap">
                  {game.genre.map((genre, key) => (
                    <div className="badge badge-primary mr-1" key={key}>
                      {genre}
                    </div>
                  ))}
                </span>
                <p className="text-sm text-accent">
                  Publisher: {game.publisher}
                </p>
                {/* <p>{game.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
