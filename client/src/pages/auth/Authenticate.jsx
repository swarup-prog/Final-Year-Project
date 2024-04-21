import React, { useEffect } from "react";
import Loading from "../loading/loading";

const Authenticate = () => {
  const token = new URLSearchParams(window.location.search).get("token");
  const checkToken = () => {
    if (token) {
      localStorage.setItem("session-token", token);
      window.location.href = "/app/home";
    } else {
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="text-secondary w-full h-screen bg-primary">
      <Loading />
    </div>
  );
};

export default Authenticate;
