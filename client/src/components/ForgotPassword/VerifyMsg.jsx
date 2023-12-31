import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const VerifyMsg = ({ email }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
        <img className="w-6 h-6" src="/img/icons/mail.svg" alt="mail icon" />
      </div>
      <h3 className="text-xl">Reset your password</h3>
      <p>Verification link has been sent to {email}.</p>
      <p>
        Didn’t get them? Please check your spam or junk folder, and if it's not
        there, please click on the '
        <span className="text-secondary font-semibold">Resend</span>' button to
        have another verification link sent to your email address.
      </p>
      <Link to="/login" className="w-full block">
        <Button>Back to Login</Button>
      </Link>
      <div className="flex items-center gap-2">
        <p>Didn’t received the instructions?</p>
        <button className="text-secondary font-semibold">Resend</button>
      </div>
    </div>
  );
};

export default VerifyMsg;
