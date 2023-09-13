import React from "react";

const Input = ({ type, placeholder, value, onChange, id, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      id={id}
      {...rest}
      onChange={onChange}
      className="border border-light-secondary rounded-lg block py-[14px] px-5 w-full outline-none text-light placeholder:text-light focus:ring-1"
    />
  );
};

export default Input;
