import React from "react";

const GameCard = ({ game }) => {
  return (
    <div
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
        <p className="text-sm text-accent">Publisher: {game.publisher}</p>
        {/* <p>{game.description}</p> */}
      </div>
    </div>
  );
};

export default GameCard;
