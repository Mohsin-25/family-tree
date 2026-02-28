import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useCreatePerson } from "../../tree/services/service";
import { useParams } from "@tanstack/react-router";

export function Form({ popup, setPopup }: { popup?: any; setPopup?: any }) {
  const methods = useForm();
  const { id } = useParams({ from: "/myTree/$id" });

  const { mutate, isPending } = useCreatePerson({ setPopup, treeId: id });

  const onSubmit = () => {
    const data = methods.getValues();
    const payload = {
      name: data?.name,
      gender: data?.gender,
      dob: data?.dob,
      maritalStatus: data?.maritalStatus,
      profession: data?.profession,
    };

    mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full bg-white p-5 gap-3">
          <p>Add New Member {popup?.data?.person?.name}</p>

          <hr className="text-gray-300" />
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
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
                  <label htmlFor="gender">Gender</label>
                  <Controller
                    control={methods.control}
                    name="gender"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="grid gap-2 flex-1/3">
                  <label htmlFor="dob">DOB</label>
                  <Input
                    id="dob"
                    type="date"
                    required
                    className="ring-0! !focus:ring-0 outline-none! !focus:outline-none w-auto"
                    {...methods.register("dob")}
                  />
                </div>
                <div className="grid gap-2 flex-1/3">
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <Controller
                    control={methods.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-auto">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="profession">Profession</label>
                <Input
                  id="profession"
                  type="text"
                  placeholder="Enter"
                  required
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
