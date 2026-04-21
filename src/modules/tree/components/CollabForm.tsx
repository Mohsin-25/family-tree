import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import { Link } from "lucide-react";
import { Button } from "../../../components/ui/button";

const CollabForm = ({ setPopup, popup }: { setPopup: any; popup: any }) => {
  const methods = useForm();

  const onSubmit = () => {
    const data = methods.getValues();

    const payload = {
      relativeId: data?.relative,
      relationId: +data?.relation,
    };
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card className="w-full bg-white p-5 gap-3">
            <p>Invite collaborators</p>
            <p className="text-[14px] -mt-2 text-gray-500">
              Share this tree with others and work together
            </p>

            <hr className="text-gray-300" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link className="size-10 bg-primary/10 rounded-full text-primary p-2" />
                <div className="flex flex-col">
                  <p>Generate Invitation Link</p>
                  <p className="text-[14px] text-gray-500">
                    Anyone with this link can view or join this tree
                  </p>
                </div>
              </div>
              <Button>
                <Link />
                Generate Invitation Link
              </Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default CollabForm;
