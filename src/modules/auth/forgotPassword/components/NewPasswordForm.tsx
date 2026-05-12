import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useChangePassword } from "../services/service";

const NewPasswordForm = ({ form }: any) => {
  const methods = useForm();

  const { mutate, isPending } = useChangePassword();

  const onSubmit = () => {
    const data = methods.getValues();

    const payload = {
      password: data?.password,
      userName: form?.data?.userName || "",
    };

    mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-3">
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              New password
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
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type="text"
              placeholder="Enter password again"
              required
              className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              {...methods.register("confirmPassword")}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="secondary"
              loading={isPending}
              className="w-full"
              disabled={
                methods.watch("password") !== methods.watch("confirmPassword")
              }
            >
              {"Save New Password"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPasswordForm;
