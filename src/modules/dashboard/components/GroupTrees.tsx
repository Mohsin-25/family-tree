import { getUserTrees } from "../services/service";
import TreeCard, { EmptyTreeCard } from "./TreeCard";

const GroupTrees = () => {
  const { trees } = getUserTrees();

  // const arr = [
  //   {
  //     title: "asd",
  //     description:
  //       "The application features a professional header with search functionality and user menu, a grid of family tree cards showing key information (member count, generations, last update), and an option to create new trees.",
  //     img: "https://images.stockcake.com/public/b/9/e/b9e8776a-d59f-4a6e-a06c-fe12576d4c2e_large/sunset-family-silhouette-stockcake.jpg",
  //     members: "35",
  //     generations: "4",
  //     updatedAt: "Updated 2 days ago",
  //   },
  //   {
  //     title: "qwe",
  //     description:
  //       "The application features a professional header with search functionality and user menu, a grid of family tree cards showing key information (member count, generations, last update), and an option to create new trees.",
  //     img: "https://images.stockcake.com/public/b/9/e/b9e8776a-d59f-4a6e-a06c-fe12576d4c2e_large/sunset-family-silhouette-stockcake.jpg",
  //     members: "78",
  //     generations: "6",
  //     updatedAt: "Updated 6 days ago",
  //   },
  // ];
  return (
    <div className="">
      <div className="flex flex-wrap gap-8">
        {trees?.map((item: any, index: number) => {
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

export default GroupTrees;
