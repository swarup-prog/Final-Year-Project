import React from "react";
import { useSelector } from "react-redux";

const UserChat = () => {
  const chat = useSelector((state) => state.chat.selectedChat);
  return (
    <div>
      <p>User Chat</p>
    </div>
  );
};

export default UserChat;
