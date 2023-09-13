import React from "react";
import AuthSecondaryLayout from "../components/layout/AuthSecondaryLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ResetPassword = () => {
  return (
    <AuthSecondaryLayout>
      <div className="flex flex-col gap-6 items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
          <img className="w-6 h-6" src="/img/icons/lock.svg" alt="lock icon" />
        </div>
        <div className="text-center">
          <h3 className="text-xl">Create new Password</h3>
          <p>Restore access to your account</p>
        </div>
        <div className="w-full mt-2">
          <form action="" className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Input type="password" placeholder="Password" id="password" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>
            <Button>Update Password</Button>
          </form>
        </div>
      </div>
    </AuthSecondaryLayout>
  );
};

export default ResetPassword;
