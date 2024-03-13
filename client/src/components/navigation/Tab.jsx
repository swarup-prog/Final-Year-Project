const Tab = ({ title, onClick, isActive, icon }) => {
  return (
    <div
      className={`flex md:w-[240px] justify-start ${
        isActive ? "text-primary bg-accent" : "text-secondary bg-primary"
      } font-medium p-3, text-base gap-5 px-4 cursor-pointer rounded-md w-full items-center py-3 ${
        !isActive && "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span>{icon}</span>
      {title}
    </div>
  );
};

export default Tab;
