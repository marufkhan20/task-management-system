import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="grid lg:grid-cols-2 bg-[#F5F7F8] min-h-screen">
      <div className="flex items-center justify-center">
        <div className="w-full mx-4 sm:mx-0 sm:w-[446px] bg-white rounded-xl box-shadow px-12 py-16">
          <h2 className="text-center text-2xl mb-8">{title}</h2>
          {children}
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(/img/auth-cover.jpeg)` }}
        className="w-full min-h-screen bg-cover relative hidden lg:block"
      >
        <div className="auth-bg absolute top-0 left-0 right-0 bottom-0 w-full h-full px-20 py-16">
          <Link to="/">
            <img src="/img/logo.png" alt="logo" />
          </Link>
          <div className="w-full h-full flex items-center">
            <h2 className="font-normal text-[40px] text-white font-krona-one">
              Unlock Your <br />
              Productivity <br />
              Potential with Us!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
