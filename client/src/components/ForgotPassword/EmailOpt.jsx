import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserByEmailQuery } from "../../features/auth/authApi";
import Button from "../ui/Button";
import Input from "../ui/Input";

const EmailOpt = ({ setActiveTab }) => {
  const [email, setEmail] = useState();
  const [errors, setErrors] = useState({});
  const [getUser, setGetUser] = useState(false);

  const {
    data: user,
    isError,
    error,
  } = useGetUserByEmailQuery(email, {
    skip: !getUser,
  });

  useEffect(() => {
    if (isError && error) {
      console.log(error?.data?.error);
      setErrors(error?.data?.error);
    }

    if (user?._id) {
      setActiveTab(2);
    }
  }, [user, isError, error, setActiveTab]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      return setErrors({
        email: "Email is required!!",
      });
    }

    setGetUser(true);
  };
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
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="font-medium text-red-500">{errors?.email}</p>
            )}
          </div>
          <Button>Continue</Button>
        </form>
      </div>
      <Link to="/login" className="text-secondary font-semibold underline">
        Back to Login
      </Link>
    </div>
  );
};

export default EmailOpt;
