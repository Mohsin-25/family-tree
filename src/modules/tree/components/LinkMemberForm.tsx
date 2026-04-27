import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../../../components/ui/card";
import { useParams } from "@tanstack/react-router";
import { getFamilyTree, useLinkPerson } from "../services/service";
import { Button } from "../../../components/ui/button";
import { User } from "lucide-react";
import { Input } from "../../../components/ui/input";

// import men from "../../../assets/user-vector-men.jpg";
// import women from "../../../assets/user-vector-women.jpg";

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
    { label: "Child", value: "4" },
  ];

  const hasSelectedValues =
    methods.watch("relation") && methods.watch("relative");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full bg-white p-5 gap-3">
          <p>
            Link a member with{" "}
            <span className="font-semibold">{popup?.data?.name}</span>
          </p>

          <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5 mb-2" />

          <div className="grid grid-cols-2 gap-4 ratio text-sm">
            <span className="font-semibold">Select Person</span>
            <span className="font-semibold">Select Relationship</span>
          </div>
          <div className="grid grid-cols-2 gap-4 ratio text-sm">
            <div className="flex flex-col gap-1 w-full">
              <div className="border rounded-md">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search"
                  className="ring-0! !focus:ring-0 outline-none! !border-none !focus:outline-none !w-full"
                  {...methods.register("search")}
                  onInput={() => {
                    if (methods.watch("relative")) {
                      methods.setValue("relative", "");
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
                {relativeOptions
                  ?.filter((itm) =>
                    methods.watch("search")
                      ? itm?.label?.includes(methods.watch("search"))
                      : itm,
                  )
                  ?.map((item) => {
                    return (
                      <div
                        className={`flex gap-2 border rounded-md px-2 py-1.5 cursor-pointer ${methods.watch("relative") == item?.value && "bg-black/20 text-primary font-semibold border-primary"}`}
                        onClick={() => {
                          methods.setValue("relative", item?.value);
                        }}
                      >
                        <User />
                        <span>{item?.label}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 h-[200px]">
              {relationOptions?.map((item) => {
                return (
                  <div
                    className={`flex w-full flex-col gap-2 items-center justify-center border rounded-md px-4 py-2 cursor-pointer ${methods.watch("relation") == item?.value && "bg-black/20 text-primary font-semibold border-primary"}`}
                    onClick={() => {
                      methods.setValue("relation", item?.value);
                    }}
                  >
                    {/* {item?.label === "Father" ? (
                      <img
                        src={men}
                        className="w-[40px] h-[40px] rounded-full object-cover mb-1"
                      />
                    ) : item?.label === "Mother" ? (
                      <img
                        src={women}
                        className="w-[40px] h-[40px] rounded-full object-cover mb-1"
                      />
                    ) : (
                      <User size={30} />
                    )} */}

                    <User size={30} />

                    <span>{item?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {hasSelectedValues && (
            <div className="flex flex-col text-sm gap-3 border mt-3 px-3 py-3 rounded-md">
              <span>Preview</span>

              <div className="flex w-full justify-between items-center">
                <div className="flex gap-2 min-h-[100px] min-w-[100px] flex-col text-center items-center justify-center w-min px-2 py-1 border rounded-md">
                  <User />{" "}
                  <span>
                    {
                      relativeOptions?.find(
                        (itm) => itm?.value == methods.watch("relative"),
                      )?.label
                    }
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span>will be linked</span>
                  <span>
                    {" as "}
                    <span className="font-semibold">
                      {
                        relationOptions?.find(
                          (itm) => itm?.value == methods.watch("relation"),
                        )?.label
                      }
                    </span>
                    {" of"}
                  </span>
                </div>
                <div className="flex gap-2 min-h-[100px] min-w-[100px] flex-col text-center items-center justify-center w-min px-2 py-1 border rounded-md">
                  <User /> <span>{popup?.data?.name}</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex-col gap-2 mt-3">
            <Button
              variant="secondary"
              className="w-full"
              type="submit"
              loading={isLinkPersonPending}
              disabled={!hasSelectedValues}
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

// return (
//   <FormProvider {...methods}>
//     <form onSubmit={methods.handleSubmit(onSubmit)}>
//       <Card className="w-full bg-white p-5 gap-3">
//         <p>link a member with {popup?.data?.name}</p>

//         <hr className="text-gray-300" />
//         <div>
//           <div className="flex gap-6">
//             <div className="grid gap-2 flex-1/3">
//               <label className="w-fit" htmlFor="relation">
//                 Relation
//               </label>
//               <Dropdown
//                 name="relation"
//                 control={methods.control}
//                 placeholder="Select"
//                 className="w-auto"
//                 options={relationOptions}
//               />
//             </div>
//             <div className="grid gap-2 flex-1/3">
//               <label className="w-fit" htmlFor="relative">
//                 {popup?.data?.name}'s{" "}
//                 {relationOptions?.find(
//                   (item) => item?.value == methods.watch("relation"),
//                 )?.label || "Relative"}
//               </label>
//               <Dropdown
//                 name="relative"
//                 control={methods.control}
//                 placeholder="Select"
//                 className="w-auto"
//                 options={relativeOptions}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex-col gap-2 mt-6">
//           <Button
//             variant="secondary"
//             className="w-full"
//             type="submit"
//             loading={isLinkPersonPending}
//           >
//             Submit
//           </Button>
//         </div>
//       </Card>
//     </form>
//   </FormProvider>
// );
