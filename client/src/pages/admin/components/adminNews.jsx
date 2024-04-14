import React from "react";

const AdminNews = () => {
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">News</div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <span className="text-center">Create news to see them here</span>
        </div>
      </section>
    </div>
  );
};

export default AdminNews;
