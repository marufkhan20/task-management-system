import React from "react";

const MobileHeader = ({ setShowSidebar }) => {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <img
        className="cursor-pointer"
        src="/img/icons/Burger Menu.svg"
        alt="menu"
        onClick={() => setShowSidebar(true)}
      />
      <img className="cursor-pointer" src="/img/logo-black.png" alt="logo" />
      <img className="cursor-pointer" src="/img/avatar.png" alt="avatar" />
    </div>
  );
};

export default MobileHeader;
