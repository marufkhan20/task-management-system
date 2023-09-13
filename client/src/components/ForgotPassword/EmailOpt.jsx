import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";

const EmailOpt = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
        <img className="w-6 h-6" src="/img/icons/user.svg" alt="user icon" />
      </div>
      <div className="text-center">
        <h3 className="text-xl">Need to reset your password?</h3>
        <p>Please enter your registered email</p>
      </div>
      <div className="w-full mt-2">
        <form action="" className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input type="email" placeholder="Email" id="email" />
          </div>
          <Button onClick={() => setActiveTab(2)}>Continue</Button>
        </form>
      </div>
      <Link to="/login" className="text-secondary font-semibold underline">
        Back to Login
      </Link>
    </div>
  );
};

export default EmailOpt;
