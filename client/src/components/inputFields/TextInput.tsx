import { InputProps } from "../../types";
import "../../styles/common.css";

const TextInput = ({
  type,
  value,
  onChange,
  name,
  label,
  style,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontSize: "16px", color: "#555555" }}>{label}</label>
      <input
        type={type}
        className="input-field"
        style={{
          ...style,
        }}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
