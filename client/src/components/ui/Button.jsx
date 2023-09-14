import React from "react";

const Button = ({ onClick, className, type, children }) => {
  return type === "border" ? (
    <button
      onClick={onClick}
      className={`block w-full px-4 py-[13px] bg-transparent rounded-lg text-heading border border-heading font-semibold transition-all hover:bg-secondary hover:border-secondary hover:text-white ${className}`}
    >
      {children}
    </button>
  ) : type === "error" ? (
    <button
      onClick={onClick}
      className={`block w-full px-4 py-[13px] bg-transparent rounded-lg border bg-alert border-alert text-alert font-semibold transition-all hover:bg-alert hover:border-alert hover:text-white ${className}`}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`block w-full px-4 py-[13px] bg-secondary rounded-lg text-white font-semibold transition-all hover:bg-secondary/80 border border-transparent ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
