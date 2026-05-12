import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { allowOnlyMentionedRegex } from "../../../../lib/helperFunctions";
import { Button } from "../../../../components/ui/button";
import { useGetVerificationCode } from "../services/service";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const methods = useForm();
  const [data, setData] = useState({
    step: 1,
    data: {},
  });

  const { mutate, isPending } = useGetVerificationCode({ setData });

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      userName: data?.userName || undefined,
      email: data?.email || undefined,
    };

    setData((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        userName: data?.userName,
        email: data?.email,
      },
    }));

    mutate(payload);
  };

  console.log("eee", data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
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
              disabled={!!methods.watch("email")}
            />
          </div>

          <div className="flex justify-center -mb-6">
            <span className="text-sm font-bold">OR</span>
          </div>

          <div className="grid gap-1">
            <label
              htmlFor="email"
              className="w-min whitespace-nowrap rounded text-sm"
            >
              Email
            </label>
            <Input
              id="email"
              type="text"
              placeholder="Enter email"
              required
              className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
              {...methods.register("email")}
              onInput={allowOnlyMentionedRegex(/[a-zA-Z0-9-_]/)}
              disabled={!!methods.watch("userName")}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="secondary"
              loading={isPending}
              className="w-full"
            >
              {"Send Code"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
