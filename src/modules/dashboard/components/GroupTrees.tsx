import { getUserTrees } from "../services/service";
import TreeCard, { EmptyTreeCard } from "./TreeCard";
import TreeCardSkeleton from "./TreeCardSkeleton";

const GroupTrees = () => {
  const { trees, isLoading } = getUserTrees();

  if (isLoading) {
    return <TreeCardSkeleton />;
  }

  return (
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
  );
};

export default GroupTrees;
