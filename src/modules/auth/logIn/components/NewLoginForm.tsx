import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useGetLoggedin } from "../services/service";
import { useGetSignin } from "../../signIn/services/service";
import { useEffect } from "react";
import { allowOnlyMentionedRegex } from "../../../../lib/helperFunctions";

const NewLoginForm = ({
  isLogin,
  setIsLogin,
}: {
  isLogin?: Boolean;
  setIsLogin?: any;
}) => {
  const methods = useForm();
  const { mutate, isPending } = useGetLoggedin();
  const { mutate: signinMutate, isPending: isSigninPending } = useGetSignin({
    setIsLogin,
  });

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      fullName: data?.fullName || undefined,
      userName: data?.userName || undefined,
      password: data?.password || undefined,
    };

    if (isLogin) {
      mutate(payload);
    } else {
      signinMutate(payload);
    }
  };

  useEffect(() => {
    methods.reset();
  }, [isLogin]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          {!isLogin && (
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
          )}
          <div className="grid gap-1">
            <label
              htmlFor="userName"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              Username
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
          </div>
          <div className="flex justify-center mt-6">
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
