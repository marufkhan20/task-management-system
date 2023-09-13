import React, { useState } from "react";
import Header from "../shared/Header";
import MobileHeader from "../shared/MobileHeader";
import Sidebar from "../shared/Sidebar";

const MainLayout = ({ category, setCategory, children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="md:flex md:justify-between w-full">
      <div
        className={`w-full md:w-[248px] transition-all duration-500 fixed top-0 ${
          showSidebar ? "left-0" : "-left-[200%] md:left-0"
        } bottom-0 md:relative`}
      >
        <Sidebar
          category={category}
          setCategory={setCategory}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <div className="content w-screen px-6">
        <div className="md:hidden">
          <MobileHeader setShowSidebar={setShowSidebar} />
        </div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
