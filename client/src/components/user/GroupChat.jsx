import React from "react";
import { useSelector } from "react-redux";

const GroupChat = () => {
  const chat = useSelector((state) => state.chat.selectedChat);
  return (
    <div>
      <p>Group Chat</p>
    </div>
  );
};

export default GroupChat;
