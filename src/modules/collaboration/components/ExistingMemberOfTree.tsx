import { useNavigate } from "@tanstack/react-router";
import { Check, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";

const ExistingMemberOfTree = ({ data }: any) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-5 p-5 rounded-lg w-full ">
      {/* <TreePalm className="text-white bg-primary size-14 p-1.5 flex items-center justify-center rounded-full cursor-pointer" /> */}

      <div className="flex flex-col items-center">
        <span className="text-[32px] font-semibold">Already a member</span>
        <span>You're already a member of this family tree</span>
      </div>

      <div className="flex flex-col items-center h-max bg-white px-4 py-5 rounded-lg w-[85%] shadow-2xl border">
        {/* <Users className="text-primary bg-primary/10 size-14 p-1.5 flex items-center justify-center rounded-full cursor-pointer" /> */}
        <Check className="text-white bg-primary size-14 p-1.5 flex items-center justify-center rounded-full cursor-pointer" />

        <span className="text-primary font-semibold mt-2">Family Tree</span>

        <span className="text-[32px] font-semibold">{data?.tree?.title}</span>

        <hr className="text-gray-300 w-[calc(100%+0px)] my-2" />

        <span className="text-sm">
          You can continue to view and explore this family tree
        </span>

        <hr className="text-gray-300 w-[calc(100%+0px)] my-2" />

        <div className="flex flex-col gap-5 bg-primary/10 w-full px-3 py-5 rounded-md mb-5 mt-3">
          <span className="text-sm">Invited by : {data?.invitedBy?.name}</span>
          <span className="text-sm">Created by : {data?.tree?.createdBy}</span>
        </div>

        <div className="flex gap-3 bg-primary/10 w-full px-3 py-5 rounded-md">
          <Users className="text-primary size-12 flex -mt-1 rounded-full cursor-pointer" />
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-primary">You're a member</span>
            <span>
              You already have access to this tree. No further action required
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-5">
          <Button
            className="w-[47%]"
            onClick={() => navigate({ to: `/myTree/${data?.tree?.id}` })}
          >
            View Tree
          </Button>
          <Button
            variant="outline"
            className="bg-red-100 w-[47%]"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExistingMemberOfTree;
