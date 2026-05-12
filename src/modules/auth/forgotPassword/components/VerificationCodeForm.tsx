import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { allowOnlyMentionedRegex } from "../../../../lib/helperFunctions";
import { Button } from "../../../../components/ui/button";
import { useVerifyCode } from "../services/service";

const VerificationCodeForm = ({ setForm, form }: any) => {
  const methods = useForm();

  const { mutate, isPending } = useVerifyCode({ setForm });

  const onSubmit = () => {
    setTimeout(() => {
      const data = methods.getValues();

      const payload = {
        verificationCode: Object.values(data).join(""),
        email: form?.data?.email || "",
      };

      mutate(payload);
    }, 1000);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          {Array.from({ length: 6 })?.map((_, idx) => {
            return (
              <Input
                id={`otp_${idx}`}
                type="text"
                placeholder=""
                required
                className="ring-0! !focus:ring-0 outline-none! !focus:outline-none w-9"
                {...methods.register(`otp_${idx}`)}
                onInput={(e) => {
                  allowOnlyMentionedRegex(/[0-9]/)(e);
                }}
                onChange={(e) => {
                  if (e.target.value && idx < 6) {
                    methods.setFocus(`otp_${idx + 1}`);
                  } else {
                    if (idx) {
                      methods.setFocus(`otp_${idx - 1}`);
                    }
                  }
                }}
                disabled={!!methods.watch("email")}
                maxLength={1}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            variant="secondary"
            loading={isPending}
            className="w-full"
          >
            {"Verify Code"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default VerificationCodeForm;
