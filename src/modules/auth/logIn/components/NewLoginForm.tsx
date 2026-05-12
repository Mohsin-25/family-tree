import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useGetLoggedin } from "../services/service";
import { useGetSignin } from "../../signIn/services/service";
import { useEffect } from "react";
import { allowOnlyMentionedRegex } from "../../../../lib/helperFunctions";
import { useNavigate, useSearch } from "@tanstack/react-router";

const NewLoginForm = ({ form, setForm }: { form?: any; setForm?: any }) => {
  const methods = useForm();
  const navigate = useNavigate();

  const search = useSearch({ from: "/signIn" });
  const redirectTo = search.redirectTo;

  const isLogin = form?.type === "login";
  const isSignin = form?.type === "signin";

  const { mutate, isPending } = useGetLoggedin();
  const { mutate: signinMutate, isPending: isSigninPending } = useGetSignin({
    setForm,
  });

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      fullName: data?.fullName || undefined,
      userName: data?.userName || undefined,
      password: data?.password || undefined,
      email: data?.email || undefined,
    };

    if (isLogin) {
      mutate(payload);
    } else {
      signinMutate(payload);
    }
  };

  useEffect(() => {
    methods.reset();
  }, [form?.type]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          {isSignin && (
            <>
              <div className="grid gap-1">
                <label
                  htmlFor="fullName"
                  className="w-min whitespace-nowrap rounded text-sm"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  required
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                  {...methods.register("fullName")}
                />
              </div>
              <div className="grid gap-1">
                <label
                  htmlFor="email"
                  className="w-min whitespace-nowrap rounded text-sm"
                >
                  Email ID{" "}
                  <span className="text-[10px] text-blue-500 font-semibold">
                    (For account recovery)
                  </span>
                </label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  required
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                  {...methods.register("email")}
                  onInput={allowOnlyMentionedRegex(/[a-zA-Z0-9@._-]/)}
                />
              </div>
            </>
          )}
          <div className="grid gap-1">
            <label
              htmlFor="userName"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              Username{" "}
              {isSignin && (
                <span className="text-[10px] text-blue-500 font-semibold">
                  (For login)
                </span>
              )}
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter username"
              required
              className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              {...methods.register("userName")}
              onInput={allowOnlyMentionedRegex(/[a-zA-Z0-9-_]/)}
            />
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              Password
            </label>
            <Input
              id="password"
              type="text"
              placeholder="Enter password"
              required
              className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              {...methods.register("password")}
            />
            {isLogin && (
              <span
                onClick={() => {
                  setForm({ type: "forgotPassword" });
                  navigate({
                    to: "/forgotPassword",
                    search: {
                      redirectTo,
                    },
                  });
                }}
                className="text-[12px] text-blue-500 ml-auto cursor-pointer hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </span>
            )}
          </div>
          <div className={`flex justify-center ${isLogin ? "mt-0" : "mt-5"}`}>
            <Button
              type="submit"
              variant="secondary"
              loading={isPending || isSigninPending}
              className="w-full"
            >
              {isLogin ? "Log In" : "Sign In"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewLoginForm;
