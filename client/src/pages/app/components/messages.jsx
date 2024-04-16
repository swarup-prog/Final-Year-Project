import React, { useDeferredValue, useEffect, useState } from "react";
import { CustomButton, CustomModal, TextInput } from "../../../components";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../../utils/toast";
import axios from "axios";
import { getSenderFull } from "../../../services/chatLogic";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiSearchAlt } from "react-icons/bi";
import { Icon, Stack, useDisclosure } from "@chakra-ui/react";
import UserListItem from "../../../components/user/UserListItem";
import UserBadge from "../../../components/user/UserBadge";
import { useDispatch } from "react-redux";
import {
  fetchUserChats,
  setActiveChat,
} from "../../../features/chat/chatSlice";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.user.data);
  const deferredSearch = useDeferredValue(searchQuery);

  const filteredBuddies = user?.buddies.filter(
    (user) =>
      user.username.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      user.name.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  const chats = useSelector((state) => state.chat.data);

  const accessChat = (id) => async () => {
    try {
      const { data } = await axios.post("/chat", { userId: id });
      dispatch(fetchUserChats());
    } catch (error) {
      console.log(error);
      toastError("Failed to access chat");
    }
  };

  const handleMessageClick = (chat) => {
    console.log("chat-message", chat);
    dispatch(setActiveChat(chat));
    navigate(
      `/app/messages/chat/?chatId=${chat._id}&isGroupChat=${chat.isGroupChat}`
    );
  };

  const handleAddMember = (user) => {
    if (teamMembers.includes(user)) {
      toastError("User already added to the team");
      return;
    }

    setTeamMembers([...teamMembers, user]);
  };

  const handleCreateTeam = async () => {
    if (!teamName) {
      toastError("Team name is required");
      return;
    }
    try {
      const { data } = axios.post("/chat/group-chat", {
        name: teamName,
        users: JSON.stringify(teamMembers.map((m) => m._id)),
      });
      dispatch(fetchUserChats());
      onClose();
      toastSuccess("Team created successfully");
    } catch (error) {
      console.log(error);
      toastError("Failed to create team");
    }
  };

  return (
    <div className=" bg-primary text-secondary px-10 py-10 overflow-y-auto">
      <section className="flex justify-between items-center">
        <div className="text-xl text-accent font-semibold">Messages</div>
        <Stack gap={5} direction={"row"}>
          {/* New Messages  */}
          <CustomModal
            tooltipTitle="Message"
            title={"New"}
            background={"ef4343"}
          >
            <section>
              <label className="input input-bordered input-accent flex items-center gap-2 bg-primary">
                <input
                  type="text"
                  className="grow bg-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                />
                <Icon as={BiSearchAlt} boxSize={7} />
              </label>
            </section>
            <div className="divider divider-accent"></div>
            <section className="h-96 overflow-y-auto">
              {searchQuery && (
                <span className="text-xs font-bold">
                  SEARCH RESULT FOR "{searchQuery}": {filteredBuddies.length}
                </span>
              )}
              {user?.buddies && user?.buddies.length >= 1 ? (
                filteredBuddies.map((buddy) => (
                  <UserListItem
                    key={buddy._id}
                    id={buddy._id}
                    name={buddy.name}
                    username={buddy.username}
                    profileImg={buddy.profileImg}
                    isMessage={true}
                  />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center gap-8 mt-20">
                  <span className="text-center">
                    You don't have any buddies yet.
                  </span>
                </div>
              )}
            </section>
          </CustomModal>

          {/* New Team Chat  */}
          <CustomModal title={"Create Team"} background={"ef4343"}>
            <section>
              <div className="text-xl text-accent font-semibold">New Team</div>
            </section>
            <div className="divider divider-accent"></div>
            <section className="flex flex-col gap-3">
              <TextInput
                label={"Team Name"}
                name={"Team Name"}
                value={teamName}
                className="w-full"
                onChange={(e) => setTeamName(e.target.value)}
              />
              <label className="input input-bordered input-accent flex items-center gap-2 bg-primary">
                <input
                  type="text"
                  className="grow bg-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                />
                <Icon as={BiSearchAlt} boxSize={7} />
              </label>
            </section>
            <section className="flex flex-wrap mt-2">
              {teamMembers.map((member) => (
                <UserBadge
                  key={member._id}
                  user={member}
                  onDelete={() =>
                    setTeamMembers(
                      teamMembers.filter((m) => m._id !== member._id)
                    )
                  }
                />
              ))}
            </section>
            <section className="h-96 overflow-y-auto">
              {searchQuery && (
                <>
                  {user?.buddies && user?.buddies.length >= 1 ? (
                    filteredBuddies
                      .slice(0, 2)
                      .map((buddy) => (
                        <UserListItem
                          key={buddy._id}
                          id={buddy._id}
                          name={buddy.name}
                          username={buddy.username}
                          profileImg={buddy.profileImg}
                          onClick={() => handleAddMember(buddy)}
                        />
                      ))
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-8 mt-20">
                      <span className="text-center">
                        You don't have any buddies yet.
                      </span>
                    </div>
                  )}
                </>
              )}
            </section>
            <div className="m-auto">
              <CustomButton title={"Create Team"} onClick={handleCreateTeam} />
            </div>
          </CustomModal>
        </Stack>
      </section>
      <div className="divider divider-accent"></div>

      {/* Messages  */}
      <section>
        <div className="flex flex-col items-center overflow-y-auto mt-7">
          {chats && chats.length >= 1 ? (
            chats.map((chat) =>
              chat.isGroupChat ? (
                <div
                  key={chat._id}
                  className="card bordered flex flex-row justify-between gap-4 p-4 mt-4 w-full cursor-pointer hover:bg-ternary hover:border-accent transition duration-300 ease-in-out"
                >
                  <div className="flex gap-5 justify-center items-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-ternary border-2 border-accent flex justify-center items-center text-3xl font-light text-accent">
                      {chat.chatName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        {chat.chatName}
                      </span>
                      <span className="text-sm">
                        {chat.users.map((u) => u.name).join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <CustomButton
                      title="Message"
                      onClick={() => handleMessageClick(chat)}
                    />
                  </div>
                </div>
              ) : (
                <UserListItem
                  key={chat._id}
                  id={chat._id}
                  chat={chat}
                  name={getSenderFull(user?._id, chat.users).name}
                  profileImg={getSenderFull(user?._id, chat.users).profileImg}
                  username={getSenderFull(user?._id, chat.users).username}
                  isMessage={true}
                />
              )
            )
          ) : (
            <span className="text-center">You don't have any messages.</span>
          )}
        </div>
      </section>
    </div>
  );
};

export default Messages;
