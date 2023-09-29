import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRegisterMutation } from "../features/auth/authApi";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [register, { data: user, isLoading, isError, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      const { data } = error || {};
      setErrors(data.error);
    }

    if (!isLoading && !isError && user?._id) {
      toast.success("User Created Successfully");
      navigate(`/verify-email/${email}`);
    }
  }, [user, isLoading, isError, error, navigate, email]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // validation
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required!!";
    }

    if (!password) {
      validationErrors.password = "Password is required!!";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required!!";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword =
        "Password and Confirm Password Doesn't Match!!";
    }

    if (Object.keys(validationErrors)?.length > 0) {
      return setErrors(validationErrors);
    }

    register({
      email,
      password,
    });
  };

  return (
    <AuthLayout title="Create an account">
      <div>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
            />
            {errors?.email && (
              <p className="text-red-500 font-medium">{errors?.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Password">Password</label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="Password"
            />
            {errors?.password && (
              <p className="text-red-500 font-medium">{errors?.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              id="ConfirmPassword"
            />
            {errors?.confirmPassword && (
              <p className="text-red-500 font-medium">
                {errors?.confirmPassword}
              </p>
            )}
          </div>
          <Button>Sign Up</Button>
          <div className="flex items-center gap-[6px]">
            <p>Already have an account?</p>
            <Link to="/login" className="text-secondary font-semibold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
