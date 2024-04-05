import { useSelector } from "react-redux";

const AdminGames = () => {
  const games = useSelector((state) => state.games.data);

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Games</div>
      </section>
      <div className="divider divider-accent"></div>
      <div className="overflow-x-auto mx-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Logo</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Publisher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>
                  <img src={game.image} width={100} />
                </td>
                <td>{game.name}</td>
                <td>
                  {game.genre.map((genre, key) => (
                    <div className="badge badge-primary mr-1" key={key}>
                      {genre}
                    </div>
                  ))}
                </td>
                <td>{game.publisher}</td>
                <td>
                  <div className="flex gap-2">
                    <span className="btn  btn-sm">Edit</span>
                    <span className="btn btn-accent text-primary btn-sm">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGames;
