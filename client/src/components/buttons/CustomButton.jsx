const CustomButton = ({
  type,
  isDisabled,
  title,
  styles,
  onClick,
  className,
  icon,
}) => {
  return (
    <div>
      <button
        type={type}
        disabled={isDisabled}
        className={`flex gap-3 button text-white px-8 py-2 bg-accent rounded-lg ${className}`}
        style={{
          ...styles,
          background: `${isDisabled ? "#4B5563" : "#EF4343"}`,
        }}
        onClick={onClick}
      >
        {title}
        {icon}
      </button>
    </div>
  );
};

export default CustomButton;