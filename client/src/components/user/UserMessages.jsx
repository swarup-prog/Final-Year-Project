import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { formatDate } from "../../services/chatLogic";
import React, { useEffect, useRef } from "react";

const Messages = ({ messages }) => {
  const user = useSelector((state) => state.user.data);
  const endOfMessages = useRef(null); // Step 1

  useEffect(() => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollIntoView({ behavior: "smooth" }); // Step 2
    }
  }, [messages]);

  return (
    <ScrollableFeed className="w-full h-full ">
      <div className="flex flex-col w-full h-full justify-end">
        {messages &&
          messages.map((m, i) => (
            <div
              key={m._id}
              className={`chat ${
                m.sender._id === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="profile" src={m.sender.profileImg} />
                </div>
              </div>
              <div className="chat-header">
                {m.sender.name}
                <time className="ml-2 text-xs opacity-50">
                  {formatDate(m.createdAt)}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  m.sender._id === user?._id
                    ? "bg-accent text-white"
                    : "bg-ternary"
                }`}
              >
                {m.content}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
        <div ref={endOfMessages}></div> {/* Step 3 */}
      </div>
    </ScrollableFeed>
  );
};

export default Messages;
