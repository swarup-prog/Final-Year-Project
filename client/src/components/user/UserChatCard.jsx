import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../features/chat/chatSlice";

const UserChatCard = ({
  id,
  chat,
  profileImg,
  name,
  username,
  onClick = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const handleMessageClick = (chat) => {
    dispatch(setActiveChat(chat));
    navigate(
      `/app/messages/chat/?chatId=${chat._id}&isGroupChat=${
        chat.isGroupChat ?? false
      }`
    );
  };

  return (
    <div
      className="border-b border-ternary flex flex-row justify-between gap-4 p-4 mt-4 w-full cursor-pointer hover:bg-ternary hover:border-accent transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="flex gap-5 justify-center items-center">
        <img
          src={profileImg}
          alt="profile"
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold hover:text-accent">
            {name}
          </span>
          <span className="text-sm">@{username}</span>
          <span className="text-md mt-3 font-semibold">
            {chat.latestMessage?.sender._id === user._id ? "You: " : ""}
            {chat.latestMessage?.content}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <CustomButton
          title="Message"
          onClick={() => handleMessageClick(chat)}
        />
      </div>
    </div>
  );
};

export default UserChatCard;
