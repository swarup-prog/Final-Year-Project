import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoLiveModal } from "../../../components";

const Home = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`https://fortnite-api.com/v2/news`, {
        headers: {},
      });
      console.log(res);
      setNews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="px-10 py-10 overflow-y-auto">
      <section>
        <div className="flex justify-between items-center">
          <div className="text-xl text-secondary font-semibold">Live</div>
          <GoLiveModal />
        </div>
      </section>
      <div className="divider divider-accent"></div>
      <section>{JSON.stringify(news)}</section>
    </div>
  );
};

export default Home;
