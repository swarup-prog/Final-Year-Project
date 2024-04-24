import React, { useEffect, useState } from "react";
import axios from "axios";
import { CustomButton, GoLiveModal } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../../../utils/toast";
import { fetchLiveData } from "../../../features/live/liveSlice";

const Home = () => {
  const dispatch = useDispatch();

  const liveStream = useSelector((state) => state.liveStreams.data);
  const user = useSelector((state) => state.user.data);

  const handleEndStream = async () => {
    try {
      const response = await axios.delete("/live/end-live");
      toastSuccess(response.data.message);
      dispatch(fetchLiveData());
    } catch (error) {
      console.error(error);
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="px-10 py-10 overflow-y-auto">
      <section>
        <div className="flex justify-between items-center">
          <div className="text-xl text-secondary font-semibold">Live Now</div>
          {liveStream?.length > 0 &&
          liveStream?.some((stream) => stream?.user._id === user?._id) ? (
            <CustomButton title={"End Stream"} onClick={handleEndStream} />
          ) : (
            <GoLiveModal />
          )}
        </div>
        <div className="flex px-5 pt-8 gap-5">
          {console.log(liveStream?.length)}
          {liveStream?.length > 0 && liveStream[0] !== null ? (
            liveStream?.map((stream) => (
              <div
                key={stream?._id}
                className="flex flex-col items-center justify-center gap-2 cursor-pointer hover:text-accent"
                onClick={() => openInNewTab(stream?.url)}
              >
                <span className="border-2 border-accent rounded-full w-fit">
                  <img src={stream?.user.profileImg} alt="profile" width={50} />
                </span>
                <div className="text-md font-semibold w-[110px] text-center">
                  {stream?.user.name}
                </div>
                <div className="text-xs">{stream?.platform}</div>
              </div>
            ))
          ) : (
            <div className="text-secondary">
              There are no active streams right now!
            </div>
          )}
        </div>
      </section>
      <div className="divider divider-accent"></div>
      <section>News</section>
    </div>
  );
};

export default Home;
