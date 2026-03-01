import { useState } from "react";
import PopupWrapper from "../form/components/PopupWrapper";
import { Form } from "../form/components/Form";
import TestFive from "./components/TestFive";
import { Plus, UserRoundCheck, UserX } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { getFamilyTree } from "./services/service";

const MyTree = () => {
  const [popup, setPopup] = useState({ data: {}, state: false });
  const { id } = useParams({ from: "/myTree/$id" });

  const { treeData } = getFamilyTree(id);

  return (
    <div>
      <FamilyTree setPopup={setPopup} popup={popup} />

      <MemberCountStatus treeData={treeData} />

      <AddMember setPopup={setPopup} />
    </div>
  );
};

export default MyTree;

const FamilyTree = ({ setPopup, popup }: { setPopup?: any; popup?: any }) => {
  return (
    <>
      <TestFive setPopup={setPopup} popup={popup} />

      <PopupWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form popup={popup} setPopup={setPopup} />
      </PopupWrapper>
    </>
  );
};

const MemberCountStatus = ({ treeData }: { treeData: any }) => {
  return (
    <div className="flex flex-col fixed top-20 left-5 p-1 text-sm gap-2">
      <span className="flex gap-2 justify-between text-secondary border border-secondary pl-2 pr-1.5 py-1 rounded-full">
        <span className="flex gap-2">
          <UserRoundCheck size={16} className="my-auto" />
          Linked
        </span>
        <span className="flex items-center justify-center bg-secondary size-5 rounded-full text-white text-[12px]">
          {treeData?.meta?.connectedPeopleCount}
        </span>
      </span>
      <span className="flex gap-2 justify-between text-red-700 border border-red-700 cursor-pointer pl-2 pr-1.5 py-1 rounded-full">
        <span className="flex gap-2">
          <UserX size={16} className="my-auto" />
          Pending
        </span>
        <span className="flex items-center justify-center bg-red-700 size-5 rounded-full text-white text-[12px]">
          {treeData?.meta?.disConnectedPeopleCount}
        </span>
      </span>
    </div>
  );
};

const AddMember = ({ setPopup }: { setPopup: any }) => {
  return (
    <Plus
      size={40}
      className="fixed bg-secondary text-white rounded-full bottom-5 right-5 p-1 cursor-pointer"
      onClick={() => setPopup({ data: {}, state: true })}
    />
  );
};
