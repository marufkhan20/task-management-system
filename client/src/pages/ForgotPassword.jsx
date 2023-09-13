import React, { useState } from "react";
import EmailOpt from "../components/ForgotPassword/EmailOpt";
import VerifyMsg from "../components/ForgotPassword/VerifyMsg";
import AuthSecondaryLayout from "../components/layout/AuthSecondaryLayout";

const tabs = {
  1: EmailOpt,
  2: VerifyMsg,
};

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState(1);

  const Tab = tabs[activeTab];

  return (
    <AuthSecondaryLayout>
      <Tab setActiveTab={setActiveTab} />
    </AuthSecondaryLayout>
  );
};

export default ForgotPassword;
