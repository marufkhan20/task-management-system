import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../ui/Button";

const ErrorAlert = ({
  open,
  title,
  description,
  icon,
  closeHandler,
  submitHandler,
}) => {
  return (
    <div
      className={`transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }  fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 bg-[#1d1d1d]/30 flex items-center justify-center`}
    >
      <div className="bg-white px-[100px] py-[72px] rounded-lg box-shadow flex flex-col justify-center items-center gap-10 relative">
        {/* close modal */}
        <AiOutlineClose
          className="absolute top-3 right-4 cursor-pointer text-xl"
          onClick={closeHandler}
        />

        <div className="w-[70px] h-[70px] rounded-full bg-alert flex items-center justify-center">
          <img
            className="w-10 h-10"
            src={`/img/icons/${icon}.svg`}
            alt="switch icon"
          />
        </div>
        <div className="flex items-center flex-col gap-2">
          <h2 className="text-2xl">{title}</h2>
          <p className="text-base font-medium">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button type="border" className="px-16" onClick={closeHandler}>
            No
          </Button>
          <Button className="px-16" type="error" onClick={submitHandler}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
