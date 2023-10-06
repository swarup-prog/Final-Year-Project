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
        className={`button ${className}`}
        style={styles}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
