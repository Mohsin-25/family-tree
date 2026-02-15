import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useGetLoggedin } from "../services/service";
import { useGetSignin } from "../../signIn/services/service";

const LoginForm = ({
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
        <div className="p-5 flex flex-col gap-10">
          <div className="grid gap-2">
            <label
              htmlFor="userName"
              className="bg-white/50 w-min whitespace-nowrap px-2 rounded font-semibold"
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
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="bg-white/50 w-min whitespace-nowrap px-2 rounded font-semibold"
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
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              disabled={isPending || isSigninPending}
              onClick={() => {}}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
