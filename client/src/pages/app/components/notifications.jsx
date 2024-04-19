import { useEffect } from "react";

const Notifications = () => {
  // useEffect(() => {}, []);

  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section>
        <div className="text-xl text-accent font-semibold">Notifications</div>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        <div className="flex flex-col justify-center items-center gap-8 mt-20">
          <span className="text-center">
            You don't have any new notifications.
          </span>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
