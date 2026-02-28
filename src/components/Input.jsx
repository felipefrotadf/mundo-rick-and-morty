import { forwardRef } from "react";

const Input = forwardRef(({ label, error, icon, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label className="text-gray-400 text-sm mb-1 block">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full bg-gray-700 text-white py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400 ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
