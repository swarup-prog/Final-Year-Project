import { InputProps } from "../../types";

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
        className="border rounded-lg py-3 px-2 w-80"
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
