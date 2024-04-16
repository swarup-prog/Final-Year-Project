import { Spinner, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import { toastError } from "../../utils/toast";
import { UserMessages } from "..";
import io from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
let socket, chatComapare;

const UserChat = () => {
  const chat = useSelector((state) => state.chat.selectedChat);
  const user = useSelector((state) => state.user.data);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => {
        setSocketConnected(true);
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

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
    socket.emit("join chat", chat._id);
  };

  useEffect(() => {
    if (chat && chat._id) {
      fetchMessages();
      chatComapare = chat;
    }
  }, [chat, socketConnected]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (message) => {
        if (!chatComapare || chatComapare._id !== message.chat._id) {
          //send notification
        } else {
          setMessages([...messages, message]);
        }
      });
    }
  });

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
      setNewMessage(""); // Move inside the try block after successful post
      const response = await axios.post("/message", {
        content: newMessage,
        chatId: chat._id,
      });
      console.log(response);
      socket.emit("new message", response.data);
      setMessages([...messages, response.data]);
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
        <div className="flex-grow overflow-y-auto flex items-end w-full">
          <UserMessages messages={messages} />
        </div>
      )}
      <form
        className="bg-ternary p-3 rounded-2xl flex sticky bottom-0 w-full"
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
