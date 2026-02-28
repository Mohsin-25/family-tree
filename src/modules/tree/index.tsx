import { useState } from "react";
import PopupWrapper from "../form/components/PopupWrapper";
import { Form } from "../form/components/Form";
import TestFive from "./components/TestFive";
import { Plus } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { getFamilyTree } from "./services/service";

const MyTree = () => {
  const [popup, setPopup] = useState({ data: {}, state: false });
  const { id } = useParams({ from: "/myTree/$id" });

  const { treeData } = getFamilyTree(id);

  return (
    <div>
      <FamilyTree setPopup={setPopup} popup={popup} />

      <PopupWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form popup={popup} setPopup={setPopup} />
      </PopupWrapper>
      {/* className="fixed text-secondary rounded-full top-21 left-5 p-1 cursor-pointer" */}

      <div className="flex flex-col fixed top-20 left-5 p-1 text-sm gap-2">
        <span className="flex gap-3 justify-between text-white bg-secondary cursor-pointer pl-3 pr-1.5 py-1 rounded-full">
          Linked Members{" "}
          <span className="text-center bg-white size-5 rounded-full text-secondary font-bold">
            {treeData?.meta?.connectedPeopleCount}
          </span>
        </span>
        <span className="flex gap-3 justify-between text-white bg-red-700 cursor-pointer pl-3 pr-1.5 py-1 rounded-full">
          Pending Members
          <span className="text-center bg-white size-5 rounded-full text-red-700 font-bold">
            {treeData?.meta?.disConnectedPeopleCount}
          </span>
        </span>
      </div>

      <Plus
        size={40}
        className="fixed bg-secondary text-white rounded-full bottom-5 right-5 p-1 cursor-pointer"
        onClick={() => setPopup({ data: {}, state: true })}
      />
    </div>
  );
};

export default MyTree;

const FamilyTree = ({ setPopup, popup }: { setPopup?: any; popup?: any }) => {
  return (
    <>
      <TestFive setPopup={setPopup} popup={popup} />
    </>
  );
};
