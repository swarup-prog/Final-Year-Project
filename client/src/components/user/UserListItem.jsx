import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../features/chat/chatSlice";

const UserListItem = ({
  id,
  chat,
  profileImg,
  name,
  username,
  isMessage = false,
  messageController = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMessageClick = (chat) => {
    dispatch(setActiveChat(chat));
    navigate(
      `/app/messages/chat/?chatId=${chat._id}&isGroupChat=${
        chat.isGroupChat ?? false
      }`
    );
  };

  const userChat = useSelector((state) => state.chat.data);
  return (
    <div className="border-b border-ternary flex flex-row justify-between gap-4 p-4 mt-4 w-full cursor-pointer hover:bg-ternary hover:border-accent transition duration-300 ease-in-out">
      <div className="flex gap-5 justify-center items-center">
        {profileImg ? (
          <img
            src={profileImg}
            alt="profile"
            className="rounded-full w-16 h-16"
          />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-3xl font-light text-accent">
            {name[0]}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{name}</span>
          <span className="text-sm">@{username}</span>
        </div>
      </div>
      {isMessage && (
        <div className="flex flex-col justify-center items-center gap-4">
          <CustomButton title="Message" onClick={messageController} />
        </div>
      )}
    </div>
  );
};

export default UserListItem;
