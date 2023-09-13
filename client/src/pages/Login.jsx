import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    const { user } = data || {};
    if (!isLoading && isError) {
      const { data } = responseError || {};
      setErrors(data?.error);
    }

    if (!isLoading && !isError && user?._id) {
      toast.success("Login successful");
      navigate("/");
    }
  }, [data, isLoading, isError, responseError, navigate]);

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

    if (Object.keys(validationErrors)?.length > 0) {
      return setErrors(validationErrors);
    }

    login({
      email,
      password,
    });
  };
  return (
    <AuthLayout title="Log in to your account">
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
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-secondary font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <Button>Login</Button>
          <div className="flex items-center gap-[6px]">
            <p>Already have an account?</p>
            <Link to="/sign-up" className="text-secondary font-semibold">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
