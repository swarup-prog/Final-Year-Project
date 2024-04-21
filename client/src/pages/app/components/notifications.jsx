import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../services/chatLogic";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { fetchNotifications } from "../../../features/notification/notificationSlice";
import { toastSuccess } from "../../../utils/toast";

const Notifications = () => {
  const dispatch = useDispatch();
  const handleMarkRead = async () => {
    try {
      const response = await axios.patch("/notifications/mark-as-read");
      dispatch(fetchNotifications());
      toastSuccess(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const notification = useSelector((state) => state.notifications.data);
  return (
    <div className="text-secondary px-10 py-10 overflow-y-auto">
      <section className="flex justify-between">
        <div className="text-xl text-secondary font-semibold">
          Notifications
        </div>
        <Tooltip label="Mark all as read" aria-label="Mark all as read">
          <div
            className="cursor-pointer hover:text-accent"
            onClick={handleMarkRead}
          >
            <IoCheckmarkDoneOutline className="text-2xl" />
          </div>
        </Tooltip>
      </section>
      <div className="divider divider-accent"></div>
      <section>
        {!notification && (
          <div className="flex flex-col justify-center items-center gap-8 mt-20">
            <span className="text-center">
              You don't have any new notifications.
            </span>
          </div>
        )}
        {notification &&
          notification.map((n) => (
            <div
              key={n._id}
              className="flex gap-4 py-4 border-b border-ternary"
            >
              <img
                src={n.sender.profileImg}
                alt="avatar"
                className="w-10 h-10 rounded-full  border border-accent"
              />
              <div className="flex flex-col justify-center gap-2 w-full">
                <div className="flex  w-full justify-between">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg text-secondary font-semibold">
                      {n.sender.name}
                    </span>
                    {!n.read && (
                      <span className="badge badge-error text-white">
                        {" "}
                        New{" "}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(n.createdAt)}
                  </span>
                </div>
                <div className="text-md text-gray-500">{n.message}</div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Notifications;
