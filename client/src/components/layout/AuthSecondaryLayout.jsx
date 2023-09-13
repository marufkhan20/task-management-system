import React from "react";

const AuthSecondaryLayout = ({ children }) => {
  return (
    <div className="bg-[#F5F7F8] flex items-center justify-center min-h-screen w-full">
      <div className="w-full mx-4 sm:mx-0 sm:w-[446px] bg-white box-shadow py-[84px] px-9 rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthSecondaryLayout;
