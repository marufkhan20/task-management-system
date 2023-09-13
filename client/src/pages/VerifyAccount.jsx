import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AuthSecondaryLayout from "../components/layout/AuthSecondaryLayout";
import { useAccountVerifyMutation } from "../features/auth/authApi";

const AccountVerificatoin = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [accountVerify, { data: user, error, isLoading }] =
    useAccountVerifyMutation();

  // get verification data
  useEffect(() => {
    if (!isLoading && error) {
      setErrors(error);
    }

    if (!isLoading && user?._id) {
      toast.success("Your Account Verified Successfully");
      navigate("/verify-email");
    }
  }, [error, isLoading, navigate, user]);

  // send verification request
  useEffect(() => {
    if (id) {
      accountVerify({ id });
    }
  }, [id, accountVerify]);

  return (
    <AuthSecondaryLayout>
      <div className="flex flex-col gap-6 items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
          <img className="w-6 h-6" src="/img/icons/mail.svg" alt="mail icon" />
        </div>
        <h3 className="text-xl">Account Verification</h3>
        <p>Please wait your account verification processing...</p>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
          eaque qui asperiores doloremque facilis ipsa dolor quas suscipit vero
          blanditiis autem sapiente, in quo, culpa aspernatur impedit
          temporibus.
        </p>
        {errors ? (
          <p className="text-red-500 text-center">{errors?.email}</p>
        ) : (
          <img src="/img/loading.gif" alt="loading" className="w-10 h-10" />
        )}
      </div>
    </AuthSecondaryLayout>
  );
};

export default AccountVerificatoin;
