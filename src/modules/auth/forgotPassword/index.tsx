import { ChevronsLeft } from "lucide-react";
import LoginWrapper from "../logIn/components/LoginWrapper";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useNavigate, useSearch } from "@tanstack/react-router";
import VerificationCodeForm from "./components/VerificationCodeForm";
import NewPasswordForm from "./components/NewPasswordForm";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  type FormType = "send-code" | "verify-code" | "new-password";

  type FormState = {
    type: FormType;
  };

  const [form, setForm] = useState<FormState>({
    type: "send-code",
    // type: "verify-code",
    // type: "new-password",
  });

  const isSendCode = form?.type === "send-code";
  const isVerifyCode = form?.type === "verify-code";
  const isNewPassword = form?.type === "new-password";

  const search = useSearch({ from: "/forgotPassword" });
  const redirectTo = search.redirectTo;

  return (
    <LoginWrapper>
      {isSendCode && (
        <>
          <div className="flex flex-col">
            <span className="text-xl font-semibold mb-0">
              Forgot Your Password?
            </span>
            <span className="text-sm text-gray-700">
              We will send you a verification code to your email.
            </span>
          </div>
          <ForgotPasswordForm setForm={setForm} />
        </>
      )}

      {isVerifyCode && (
        <>
          <div className="flex flex-col">
            <span className="text-xl font-semibold mb-0">Verify code</span>
            <span className="text-sm text-gray-700">
              We have sent a verification code to your email.
            </span>
            <span className="text-sm text-gray-700">
              Enter the verification code to continue.
            </span>
          </div>
          <VerificationCodeForm setForm={setForm} form={form} />
        </>
      )}

      {isNewPassword && (
        <>
          <div className="flex flex-col">
            <span className="text-xl font-semibold mb-0">
              Create new password
            </span>
            <span className="text-sm text-gray-700">
              Enter your new password below.
            </span>
          </div>
          <NewPasswordForm form={form} />
        </>
      )}

      <div className="flex gap-2 items-center justify-center text-sm">
        <span className="text-muted-foreground">Back to login </span>
        <button
          type="button"
          onClick={() => {
            navigate({
              to: "/signIn",
              search: {
                redirectTo,
              },
            });
          }}
          className="text-gray-700 cursor-pointer hover:underline font-medium"
        >
          <ChevronsLeft />
        </button>
      </div>
    </LoginWrapper>
  );
};

export default ForgotPassword;
