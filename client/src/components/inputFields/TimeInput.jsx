const TimeInput = ({ value, onChange, className = "", name, label }) => {
  return (
    <div className={`relative `}>
      <label
        htmlFor={name}
        className={`${className} min-w-[332px] block overflow-hidden bg-primary rounded-lg border border-ternary px-3 py-2 lg:w-[full] shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-red-500 `}
      >
        <span className="text-xs font-medium text-secondary ">{label}</span>

        <input
          type="time"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="mt-1 w-full border-none bg-transparent text-secondary p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm relative"
        />
      </label>
    </div>
  );
};

export default TimeInput;
