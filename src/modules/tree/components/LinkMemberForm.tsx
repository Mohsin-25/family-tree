import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import { useParams } from "@tanstack/react-router";
import { getFamilyTree, useLinkPerson } from "../services/service";
import { Dropdown } from "../../../components/ui/Dropdown";
import { Button } from "../../../components/ui/button";

const LinkMemberForm = ({
  popup,
  setPopup,
}: {
  popup?: any;
  setPopup?: any;
}) => {
  const { id } = useParams({ from: "/myTree/$id" });
  const { treeData } = getFamilyTree(id);

  const { mutate: linkPersonMutate, isPending: isLinkPersonPending } =
    useLinkPerson({
      setPopup,
      treeId: id,
      personId: popup?.data?._id,
    });

  const methods = useForm();

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      relativeId: data?.relative,
      relationId: +data?.relation,
    };

    linkPersonMutate(payload);
  };

  const allMembers = [
    ...treeData?.connectedPeople,
    ...treeData?.disConnectedPeople,
  ];

  const relativeOptions = allMembers
    ?.filter((item) => item?._id !== popup?.data?._id)
    ?.map((item) => {
      return {
        label: item?.name,
        value: item?._id,
      };
    });

  const relationOptions = [
    { label: "Father", value: "1" },
    { label: "Mother", value: "2" },
    { label: "Spouse", value: "3" },
    { label: "Childers", value: "4" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full bg-white p-5 gap-3">
          <p>link a member with {popup?.data?.name}</p>

          <hr className="text-gray-300" />
          <div>
            <div className="flex gap-6">
              <div className="grid gap-2 flex-1/3">
                <label className="w-fit" htmlFor="relation">
                  Relation
                </label>
                <Dropdown
                  name="relation"
                  control={methods.control}
                  placeholder="Select"
                  className="w-auto"
                  options={relationOptions}
                />
              </div>
              <div className="grid gap-2 flex-1/3">
                <label className="w-fit" htmlFor="relative">
                  {popup?.data?.name}'s{" "}
                  {relationOptions?.find(
                    (item) => item?.value == methods.watch("relation"),
                  )?.label || "Relative"}
                </label>
                <Dropdown
                  name="relative"
                  control={methods.control}
                  placeholder="Select"
                  className="w-auto"
                  options={relativeOptions}
                />
              </div>
            </div>
          </div>
          <div className="flex-col gap-2 mt-6">
            <Button
              variant="secondary"
              className="w-full"
              type="submit"
              disabled={isLinkPersonPending}
            >
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
};

export default LinkMemberForm;
