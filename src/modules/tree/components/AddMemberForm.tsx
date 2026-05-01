import { useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Dropdown } from "../../../components/ui/Dropdown";
import { Input } from "../../../components/ui/input";
import { useCreatePerson, useUpdatePerson } from "../services/service";
import Uploader from "../../../components/ui/Uploader";
dayjs.extend(customParseFormat);

type PersonFormValues = {
  name: string;
  gender: "M" | "F";
  dob: string;
  maritalStatus: "S" | "M";
  profession: string;
  photo?: string;
  removePhoto?: "Y" | "N";
};

export function AddMemberForm({
  popup,
  setPopup,
}: {
  popup?: any;
  setPopup?: any;
}) {
  const methods = useForm<PersonFormValues>({
    defaultValues: {
      name: "",
      gender: "M",
      dob: "1900-01-01",
      maritalStatus: "S",
      profession: "",
      photo: "",
      removePhoto: "N",
    },
  });

  const { id } = useParams({ from: "/myTree/$id" });
  const { mutate: createPersonMutate, isPending: isCreatePersonPending } =
    useCreatePerson({
      setPopup,
      treeId: id,
    });

  const memberIdToBeUpdated = popup?.data?.id;
  const memberDataToPrefill = popup?.data?.data || {};

  const { mutate: updatePersonMutate, isPending: isUpdatePersonPending } =
    useUpdatePerson({
      setPopup,
      treeId: id,
      personId: memberIdToBeUpdated,
    });

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = new FormData();

    payload.append("name", data?.name);
    payload.append("gender", data?.gender);
    payload.append("dob", data?.dob);
    payload.append("maritalStatus", data?.maritalStatus);
    payload.append("profession", data?.profession);
    payload.append("removePhoto", data?.removePhoto || "N");

    const file = data?.photo?.[0];
    if (file) {
      payload.append("photo", file);
    }

    if (memberIdToBeUpdated) {
      updatePersonMutate(payload);
    } else {
      createPersonMutate(payload);
    }
  };

  useEffect(() => {
    if (memberIdToBeUpdated) {
      methods.reset({
        name: memberDataToPrefill?.name,
        gender: memberDataToPrefill?.gender || null,
        dob: memberDataToPrefill?.dob,
        maritalStatus: memberDataToPrefill?.maritalStatus || null,
        profession: memberDataToPrefill?.profession,
        photo: memberDataToPrefill?.photo?.url,
      });
    }
  }, [memberIdToBeUpdated]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full bg-white p-5 gap-3">
          {popup?.form === "editMember" ? (
            <p>
              Edit <span className="font-bold">{popup?.data?.data?.name}</span>
              's details
            </p>
          ) : (
            <p>Add new member</p>
          )}

          <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

          <div>
            <div className="flex flex-col gap-3">
              {/* <div className="grid grid-cols-3">
                <div className="w-min">
                  <Uploader
                    methods={methods}
                    defaultImage={memberDataToPrefill?.photoUrl}
                  />
                </div>
                <div className="grid col-span-2 h-min mt-5">
                  <label className="w-fit mb-2" htmlFor="name">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter"
                    required
                    className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                    {...methods.register("name")}
                  />
                </div>
              </div> */}
              <div className="grid gap-2">
                <Uploader
                  methods={methods}
                  defaultImage={memberDataToPrefill?.photo?.url}
                />
                <label className="w-fit" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter"
                  required
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                  {...methods.register("name")}
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="grid gap-2 flex-1/3">
                  <label className="w-fit" htmlFor="gender">
                    Gender
                  </label>
                  <Dropdown
                    name="gender"
                    control={methods.control}
                    placeholder="Select"
                    className="w-auto"
                    options={[
                      { label: "Male", value: "M" },
                      { label: "Female", value: "F" },
                    ]}
                  />
                </div>
                <div className="grid gap-2 flex-1/3">
                  <label className="w-fit" htmlFor="dob">
                    DOB
                  </label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    className="ring-0! !focus:ring-0 outline-none! !focus:outline-none w-auto"
                    {...methods.register("dob")}
                  />
                </div>
                <div className="grid gap-2 flex-1/3">
                  <label className="w-fit" htmlFor="maritalStatus">
                    Marital Status
                  </label>
                  <Dropdown
                    name="maritalStatus"
                    control={methods.control}
                    placeholder="Select"
                    className="w-auto"
                    options={[
                      { label: "Single", value: "S" },
                      { label: "Married", value: "M" },
                    ]}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="w-fit" htmlFor="profession">
                  About <span className=" text-[12px] -mt-3">( Optional )</span>
                </label>
                <Input
                  id="profession"
                  type="text"
                  placeholder="Enter"
                  // required
                  className="ring-0! !focus:ring-0 outline-none! !focus:outline-none"
                  {...methods.register("profession")}
                />
              </div>
            </div>
          </div>
          {/* <hr className="mb-2 mt-4 text-gray-300" /> */}
          <div className="flex-col gap-2 mt-6">
            <Button
              variant="secondary"
              className="w-full"
              type="submit"
              loading={isCreatePersonPending || isUpdatePersonPending}
            >
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
