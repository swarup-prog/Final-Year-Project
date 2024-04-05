import React from "react";

const Messages = () => {
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Messages</div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <span className="text-center">You don't have any messages.</span>
        </div>
      </section>
    </div>
  );
};

export default Messages;
