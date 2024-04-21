import { useState } from "react";
import { useSelector } from "react-redux";

const Tab = ({ title, onClick, isActive, icon }) => {
  const notificationUnread = useSelector(
    (state) => state.notifications.unreadCount
  );
  const buddyRequest = useSelector((state) => state.user.data.buddyRequest);

  const isBadgeVisible =
    (title === "Notifications" && notificationUnread > 0) ||
    (title === "Buddies" && buddyRequest.length > 0);

  return (
    <div
      className={`flex md:w-[240px] justify-start ${
        isActive ? "text-primary bg-accent" : "text-secondary bg-primary"
      } font-medium p-3, text-base gap-5 px-4 cursor-pointer rounded-md w-full items-center py-3 ${
        !isActive && "hover:bg-ternary"
      }`}
      onClick={onClick}
    >
      <span>{icon}</span>
      {title}
      {isBadgeVisible && (
        <span className={`badge ${isActive ? "" : "badge-accent"} text-white`}>
          {title === "Notifications" ? notificationUnread : buddyRequest.length}{" "}
          New
        </span>
      )}
    </div>
  );
};

export default Tab;
