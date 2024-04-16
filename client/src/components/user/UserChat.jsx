import { Spinner, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import { toastError } from "../../utils/toast";
import { UserMessages } from "..";

const UserChat = () => {
  const chat = useSelector((state) => state.chat.selectedChat);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/message/${chat._id}`);
      setMessages(response.data);
      console.log("messages", response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toastError("Failed to fetch messages");
    }
  };

  useEffect(() => {
    if (chat && chat._id) {
      fetchMessages();
    }
  }, [chat]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post("/message", {
        content: newMessage,
        chatId: chat._id,
      });
      console.log(response);
      setNewMessage(""); // Move inside the try block after successful post
    } catch (error) {
      console.error(error);
      toastError(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Failed to send message"
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {loading ? (
        <Spinner
          size={"xl"}
          w={20}
          h={20}
          alignSelf={"center"}
          margin={"auto"}
          color={"#EF4343"}
        />
      ) : (
        <div className="flex-grow overflow-y-aut flex items-end w-full">
          <UserMessages messages={messages} />
        </div>
      )}
      <form
        className="bg-ternary p-3 rounded-2xl flex"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a message"
          className="w-full border-none bg-ternary text-secondary p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm relative flex-shrink"
          onKeyDown={handleKeyPress}
        />
        <Tooltip label="Send" aria-label="Send">
          <button type="submit">
            <BiSend size={25} className="hover:text-accent" />
          </button>
        </Tooltip>
      </form>
    </div>
  );
};

export default UserChat;
