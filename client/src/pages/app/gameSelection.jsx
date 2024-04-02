import logo from "../../assets/logo-red-trans.png";
import { useSelector, useDispatch } from "react-redux";
import { ThemeSwitchButton } from "../../components";
import { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { fetchUserData } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GameSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const games = useSelector((state) => state.games.data);

  const [selectedGame, setSelectedGame] = useState([]);

  const handleCardClick = (id) => {
    if (selectedGame.includes(id)) {
      setSelectedGame(selectedGame.filter((gameId) => gameId !== id));
    } else {
      // If the game ID is not in the formData.games array, add it
      setSelectedGame([...selectedGame, id]);
    }
    console.log(selectedGame);
  };

  const handleGameSelection = async () => {
    try {
      if (user) {
        const response = await axios.patch("/user/updateInterestedgame", {
          userId: user._id,
          interestedGames: selectedGame,
        });
        console.log(response);
        if (response.status === 200) {
          dispatch(fetchUserData(user?._id));
          toastSuccess(response.data.message);
          navigate("/app");
        }
      }
    } catch (error) {
      toastError(response.error.data.message);
    }
  };

  return (
    <div className="bg-primary min-h-screen px-10 py-10 md:px-64 md:py-16 text-secondary flex flex-col items-center gap-10">
      <ThemeSwitchButton />
      <section className="flex flex-col justify-center items-center gap-5 max-w-[650px]">
        <img src={logo} alt="Gamer Connect" width={400} />
        <span className="text-center">
          {" "}
          Welcome to Gamer connect, {user?.name}.<br />
          Choose at least one game from the games below to start you gaming
          friends search journey
        </span>
      </section>
      <section className="flex flex-col items-center">
        <span>{selectedGame}</span>
        <div className="text-accent  text-2xl font-semibold mb-5">
          Choose a Game
        </div>
        <div className="flex gap-5 flex-wrap">
          {games?.map((game, k) => (
            <div
              key={k}
              className={`card w-96 bg-primary border ${
                selectedGame.includes(game._id)
                  ? "border-accent"
                  : "border-ternary"
              } cursor-pointer`}
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
        <div
          className="btn btn-accent text-white mt-10 "
          onClick={handleGameSelection}
        >
          Proceed
        </div>
      </section>
    </div>
  );
};

export default GameSelection;
