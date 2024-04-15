import React, { useEffect, useState } from "react";
import { toastError } from "../../../utils/toast";
import { GroupChat, UserChat } from "../../../components";
import { useSelector } from "react-redux";
import { getSenderFull } from "../../../services/chatLogic";

const Chat = () => {
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [sender, setSender] = useState({});

  const chat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isGroupChat = urlParams.get("isGroupChat");
    if (isGroupChat === "true") {
      setIsGroupChat(true);
    } else {
      setSender(getSenderFull(user?._id, chat?.users));
    }
  }, []);

  return (
    <div className="bg-primary w-full h-max ">
      {/* Chat Heading  */}
      <section className="border-b border-ternary chat-heading">
        {isGroupChat ? (
          <div>{chat.chatName.toUpperCase()}</div>
        ) : (
          <div>
            <span>{JSON.stringify(sender)}</span>
            {/* {getSenderFull(user?._id, chat?.users).toUpperCase()} */}
          </div>
        )}
      </section>
      {isGroupChat ? <GroupChat /> : <UserChat />}
    </div>
  );
};

export default Chat;
