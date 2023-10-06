import { ButtonProps } from "../../types";

const CustomButton = ({
  type,
  isDisabled,
  title,
  styles,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        disabled={isDisabled}
        className={`button text-white px-8 py-2 bg-red-500 rounded-lg ${className}`}
        style={styles}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
