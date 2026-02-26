import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarDays, Plus, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import PopupWrapper from "../../form/components/PopupWrapper";
import { CreateTreeForm } from "./CreateTreeForm";
dayjs.extend(relativeTime);

const TreeCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden w-[350px] min-h-[450px] border border-extraLightGray rounded-lg shadow-lg group">
      <div className="flex flex-col relative">
        <img
          src={
            item?.img ||
            "https://images.stockcake.com/public/b/9/e/b9e8776a-d59f-4a6e-a06c-fe12576d4c2e_large/sunset-family-silhouette-stockcake.jpg"
          }
          alt="family photo"
          className="rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute bottom-3 left-3 text-white font-bold text-2xl">
          {item?.title}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <span className="">{item?.description}</span>
        <div className="flex gap-8">
          <span className="flex gap-3 items-center">
            <Users size={20} />
            <span>{item?.memberCount} members</span>
          </span>
          {/* <span className="flex gap-3 items-center">
            <Trees size={20} />
            <span>{item?.generations} generations</span>
          </span> */}
        </div>
        <div className="flex">
          <span className="flex gap-3 items-center">
            <CalendarDays size={20} />
            <span>Updated {dayjs(item?.updatedAt).fromNow()}</span>
          </span>
        </div>
      </div>
      <div className="p-4 pt-0 mt-auto">
        <Button
          className="w-full"
          onClick={() =>
            navigate({ to: "/myTree/$id", params: { id: item?.treeId } })
          }
        >
          View Tree
        </Button>
      </div>
    </div>
  );
};

export default TreeCard;

export const EmptyTreeCard = () => {
  const [popup, setPopup] = useState(false);
  return (
    <>
      <div
        className="flex flex-col gap-2 w-[350px] min-h-[450px] border border-dashed border-black/50 rounded-lg shadow-lg items-center justify-center hover:border-black/70 cursor-pointer hover:bg-card/15"
        onClick={() => setPopup(true)}
      >
        <span className="bg-black/10 rounded-full p-4">
          <Plus size={30} />
        </span>
        <span className="text-xl font-semibold">Create New Tree</span>
        <span>Start documenting a new family lineage</span>
      </div>
      <PopupWrapper open={popup} onOpenChange={() => setPopup(false)}>
        <CreateTreeForm setPopup={setPopup} />
      </PopupWrapper>
    </>
  );
};
