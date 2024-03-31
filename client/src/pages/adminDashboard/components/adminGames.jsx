import { useSelector } from "react-redux";

const AdminGames = () => {
  const games = useSelector((state) => state.games.data);

  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
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
                    <div className="badge mr-1" key={key}>
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
