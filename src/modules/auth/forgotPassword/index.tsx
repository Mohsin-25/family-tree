import { ChevronsLeft } from "lucide-react";
import LoginWrapper from "../logIn/components/LoginWrapper";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useNavigate, useSearch } from "@tanstack/react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const search = useSearch({ from: "/forgotPassword" });
  const redirectTo = search.redirectTo;

  return (
    <LoginWrapper>
      <div className="flex flex-col">
        <span className="text-xl font-semibold mb-0">
          Forgot Your Password?
        </span>
        <span className="text-sm text-gray-700">
          We will send you a verification code to your email.
        </span>
      </div>

      <ForgotPasswordForm />

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
