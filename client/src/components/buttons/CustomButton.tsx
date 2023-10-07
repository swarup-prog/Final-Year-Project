import { ButtonProps } from "../../types";

const CustomButton = ({
  type,
  isDisabled,
  title,
  styles,
  onClick,
  className,
  icon,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        disabled={isDisabled}
        className={`flex gap-3 button text-white px-8 py-2 bg-primary rounded-lg ${className}`}
        style={styles}
        onClick={onClick}
      >
        {title}
        {icon}
      </button>
    </div>
  );
};

export default CustomButton;
