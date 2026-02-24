import { CalendarDays, Plus, Trees, Users } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const Dashboard = () => {
  const arr = [
    {
      title: "asd",
      description:
        "The application features a professional header with search functionality and user menu, a grid of family tree cards showing key information (member count, generations, last update), and an option to create new trees.",
      img: "https://images.stockcake.com/public/b/9/e/b9e8776a-d59f-4a6e-a06c-fe12576d4c2e_large/sunset-family-silhouette-stockcake.jpg",
      members: "35",
      generations: "4",
      updatedAt: "Updated 2 days ago",
    },
    {
      title: "qwe",
      description:
        "The application features a professional header with search functionality and user menu, a grid of family tree cards showing key information (member count, generations, last update), and an option to create new trees.",
      img: "https://images.stockcake.com/public/b/9/e/b9e8776a-d59f-4a6e-a06c-fe12576d4c2e_large/sunset-family-silhouette-stockcake.jpg",
      members: "78",
      generations: "6",
      updatedAt: "Updated 6 days ago",
    },
  ];
  return (
    <div className="bg-background h-full p-8">
      <div className="mb-8">
        <p className="text-2xl font-semibold">Your Family Trees</p>
        <p className="">
          Select a tree to explore or create a new one to start documenting your
          family history.
        </p>
      </div>
      <div className="flex flex-wrap gap-8">
        {arr?.map((item, index) => {
          return (
            <div key={index}>
              <TreeCard item={item} />
            </div>
          );
        })}
        <EmptyTreeCard />
      </div>
    </div>
  );
};

export default Dashboard;

const TreeCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col overflow-hidden w-[350px] min-h-[450px] border border-extraLightGray rounded-lg shadow-lg group">
      <div className="flex flex-col relative">
        <img
          src={item?.img}
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
            <span>{item?.members} members</span>
          </span>
          <span className="flex gap-3 items-center">
            <Trees size={20} />
            <span>{item?.generations} generations</span>
          </span>
        </div>
        <div className="flex">
          <span className="flex gap-3 items-center">
            <CalendarDays size={20} />
            <span>{item?.updatedAt}</span>
          </span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => navigate({ href: "/myTree" })}
        >
          View Tree
        </Button>
      </div>
    </div>
  );
};

const EmptyTreeCard = () => {
  return (
    <div className="flex flex-col gap-2 w-[350px] min-h-[450px] border border-dashed border-black/50 rounded-lg shadow-lg items-center justify-center hover:border-black/70 cursor-pointer hover:bg-card/15">
      <span className="bg-black/10 rounded-full p-4">
        <Plus size={30} />
      </span>
      <span className="text-xl font-semibold">Create New Tree</span>
      <span>Start documenting a new family lineage</span>
    </div>
  );
};
