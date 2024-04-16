import React, { useEffect, useState } from "react";
import { toastError } from "../../../utils/toast";
import { GroupChat, UserChat } from "../../../components";
import { useSelector } from "react-redux";
import { getSenderFull } from "../../../services/chatLogic";
import { Spinner } from "@chakra-ui/react";

const Chat = () => {
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [sender, setSender] = useState(null);

  const chat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsGroupChat(urlParams.get("isGroupChat") === "true");

    if (user && chat) {
      if (!isGroupChat) {
        const resolvedSender = getSenderFull(user._id, chat.users);
        setSender(resolvedSender);
      }
    }
  }, [user, chat, isGroupChat]);

  if (!chat || (user && !isGroupChat && !sender)) {
    return (
      <Spinner size={"xl"} w={20} h={20} alignSelf={"center"} margin={"auto"} />
    ); // Fallback or loading state
  }

  return (
    <div className="bg-primary w-full h-full  p-5 flex flex-col">
      <section className=" chat-heading">
        {isGroupChat ? (
          <>
            <div className="flex flex-col">
              <div>{chat.chatName.toUpperCase()}</div>
              <span className="font-normal text-sm">
                {chat.users.length} Participants
              </span>
            </div>
          </>
        ) : (
          sender && (
            <div className="flex gap-5">
              <img
                src={sender.profileImg}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <div>{sender.name}</div>
                <span className="font-normal text-sm">@{sender.username}</span>
              </div>
            </div>
          )
        )}
      </section>
      <div className="flex-grow">
        {isGroupChat ? <GroupChat /> : <UserChat />}
      </div>
    </div>
  );
};

export default Chat;
