import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useCreateTree } from "../services/service";

type FormValues = {
  title: string;
  description: string;
};

export function CreateTreeForm({ setPopup }: { setPopup?: any }) {
  const methods = useForm<FormValues>();
  const { mutate, isPending } = useCreateTree({ setPopup });

  const onSubmit = () => {
    const { title, description } = methods.getValues();

    const payload = { title, description };

    mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full bg-white p-5 gap-3">
          <p>Create New Family Tree</p>

          <hr className="text-gray-300" />
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter"
                  required
                  {...methods.register("title")}
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter"
                  required
                  {...methods.register("description")}
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                />
              </div>
            </div>
          </div>
          <hr className="mb-2 mt-4 text-gray-300" />
          <div className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full bg-gray-200"
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
