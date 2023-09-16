import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AuthSecondaryLayout from "../components/layout/AuthSecondaryLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useResetPasswordMutation } from "../features/auth/authApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { token } = useParams();

  const [resetPassword, { data: user, isError, error }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
      setErrors(error?.data);
    }

    if (user?._id) {
      toast.success("Reset Password Successfully");
      navigate("/login");
    }
  }, [user, isError, error, navigate]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!password) {
      validationErrors.password = "Password is required!!";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required!!";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword =
        "Password and Confirm password dont match!!";
    }

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    resetPassword({ password, token });
  };
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
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors?.password && (
                <p className="text-red-500 font-medium">{errors?.password}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 font-medium">
                  {errors?.confirmPassword}
                </p>
              )}
              {errors?.message && (
                <p className="text-red-500 font-medium">{errors?.message}</p>
              )}
            </div>
            <Button>Update Password</Button>
          </form>
        </div>
      </div>
    </AuthSecondaryLayout>
  );
};

export default ResetPassword;
