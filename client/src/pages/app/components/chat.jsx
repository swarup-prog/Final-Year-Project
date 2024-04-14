import React, { useEffect, useState } from "react";
import { toastError } from "../../../utils/toast";
import axios from "axios";

const Chat = () => {
  const chatId = new URLSearchParams(window.location.search).get("chatId");
  const isGroupChat = new URLSearchParams(window.location.search).get(
    "isGroupChat"
  );

  return <div className="bg-primary"></div>;
};

export default Chat;
