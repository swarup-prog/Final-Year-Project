import { InputProps } from "../../types";

const TextInput = ({ type, value, onChange, name, label }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block overflow-hidden rounded-lg border border-accent px-3 py-2 lg:w-[300px] shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-red-500 "
      >
        <span className="text-xs font-medium text-primaryT ">{label}</span>

        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="mt-1 w-full border-none bg-transparent text-primaryT p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
      </label>
    </div>
  );
};

export default TextInput;
