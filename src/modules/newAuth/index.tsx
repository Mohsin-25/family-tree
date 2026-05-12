import { useState } from "react";
import LoginWrapper from "../auth/logIn/components/LoginWrapper";
import NewLoginForm from "../auth/logIn/components/NewLoginForm";

const NewAuth = () => {
  type FormType = "login" | "signin" | "forgotPassword";

  type FormState = {
    type: FormType;
  };

  const [form, setForm] = useState<FormState>({
    type: "login",
  });

  const isLogin = form?.type === "login";
  const isSignin = form?.type === "signin";

  return (
    <LoginWrapper>
      {isLogin && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-0">Welcome Back</span>
          <span className="text-sm text-gray-700">
            Sign in to continue your family tree
          </span>
        </div>
      )}
      {isSignin && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold mb-0">Create Account</span>
          <span className="text-sm text-gray-700">
            Start your family tree journey today
          </span>
        </div>
      )}

      <NewLoginForm form={form} setForm={setForm} />

      {isLogin && (
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button
            type="button"
            onClick={() => setForm({ type: "signin" })}
            className="text-gray-700 hover:underline font-medium cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}
      {isSignin && (
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => setForm({ type: "login" })}
            className="text-gray-700 hover:underline font-medium cursor-pointer"
          >
            Log In
          </button>
        </div>
      )}
    </LoginWrapper>
  );
};

export default NewAuth;
