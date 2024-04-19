import { Icon } from "@chakra-ui/react";

const ConnectButton = ({ title, icon, onClick }) => {
  return (
    <button className="btn btn-accent text-white w-[130px]" onClick={onClick}>
      {icon}
      {title}
    </button>
  );
};

export default ConnectButton;
