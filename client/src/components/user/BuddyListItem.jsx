import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import { useDispatch } from "react-redux";
import { setActiveChat } from "../../features/chat/chatSlice";
import { LuUserCheck2 } from "react-icons/lu";

const BuddyListItem = ({ buddy }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="card bordered flex flex-row justify-between gap-4 p-4 mt-4 w-full cursor-pointer hover:bg-ternary hover:border-accent transition duration-300 ease-in-out"
      onClick={() => navigate(`/app/profile/${buddy._id}`)}
    >
      <div className="flex gap-5 justify-center items-center">
        <img
          src={buddy.profileImg}
          alt="profile"
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{buddy.name}</span>
          <span className="text-sm">@{buddy.username}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <button className="btn btn-accent text-white w-[130px]">
          <LuUserCheck2 size={25} />
          Buddy
        </button>
        <button className="text-accent font-semibold hover:underline">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default BuddyListItem;
