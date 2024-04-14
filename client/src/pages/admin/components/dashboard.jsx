import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiJoystick } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa6";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState("");
  const [totalGames, setTotalGames] = useState("");

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get("/user/getTotalUsers");
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchTotalGames = async () => {
    try {
      const response = await axios.get("/game/getTotalGames");
      setTotalGames(response.data.totalGames);
    } catch (error) {
      console.error("Error fetching total games:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalGames();
  }, []);

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Dashboard</div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <div className="stats shadow shadow-ternary bg-primary">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <HiOutlineUsers size={35} />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-secondary">{totalUsers}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <BiJoystick size={35} />
              </div>
              <div className="stat-title">Total Games</div>
              <div className="stat-value text-secondary">{totalGames}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaRegNewspaper size={35} />
              </div>
              <div className="stat-title">Total News</div>
              <div className="stat-value text-secondary">{"124"}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
