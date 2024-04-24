import React from "react";
import { PublishNewsModal } from "../../../components";
import { useSelector } from "react-redux";

const AdminNews = () => {
  const news = useSelector((state) => state.news.data);
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="flex justify-between items-center">
          <div className="text-xl text-secondary font-semibold">News</div>

          <PublishNewsModal />
        </div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center gap-8 mt-20">
          <span className="text-center">
            {news?.slice(1, 2).map((news) => (
              <div key={news._id} className="flex flex-col items-start gap-4">
                <div className="text-xl font-semibold">{news.title}</div>
                <div
                  className="text-secondary flex flex-col gap-4 "
                  dangerouslySetInnerHTML={{ __html: news?.content }}
                ></div>
              </div>
            ))}
          </span>
        </div>
      </section>
    </div>
  );
};

export default AdminNews;
