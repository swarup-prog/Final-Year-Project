import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
  formatDate,
  isLastMessage,
  isSameSender,
} from "../../services/chatLogic";

const Messages = ({ messages }) => {
  const user = useSelector((state) => state.user.data);

  return (
    <ScrollableFeed className="w-full">
      {messages &&
        messages.map((m, i) => (
          <div
            className={`chat ${
              m.sender._id === user._id ? "chat-end" : "chat-start"
            }`}
          >
            {/* <div className="flex" key={message._id}> */}
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
                m.sender._id === user._id ? "bg-accent" : "bg-ternary"
              }`}
            >
              {m.content}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          // </div>
        ))}
    </ScrollableFeed>
  );
};

export default Messages;
