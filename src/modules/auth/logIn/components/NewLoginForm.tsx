import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const NewLoginForm = ({
  isLogin,
  mutate,
  isPending = false,
  signinMutate,
  isSigninPending = false,
}: {
  isLogin?: Boolean;
  mutate?: any;
  isPending?: boolean | undefined;
  signinMutate?: any;
  isSigninPending?: boolean | undefined;
}) => {
  const methods = useForm();

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      userName: data?.userName,
      password: data?.password,
    };

    if (isLogin) {
      mutate(payload);
    } else {
      signinMutate(payload);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="grid gap-1">
            <label
              htmlFor="userName"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              User Name
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter username"
              required
              className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              {...methods.register("userName")}
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
