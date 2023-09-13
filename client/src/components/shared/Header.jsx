import React from "react";

const Header = () => {
  return (
    <header className="py-8 border-b border-light-secondary flex items-center justify-between gap-5">
      <h3>Wed Aug 30, 2023</h3>
      <div className="flex items-center gap-[6px]">
        <span>Total time today:</span>
        <h3 className="text-base">18h 52m</h3>
      </div>
    </header>
  );
};

export default Header;
