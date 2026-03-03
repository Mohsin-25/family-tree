import { Skeleton } from "@radix-ui/themes";
import { getUserTrees } from "../services/service";
import TreeCard, { EmptyTreeCard } from "./TreeCard";

const GroupTrees = () => {
  const { trees, isLoading } = getUserTrees();

  return (
    <Skeleton width={"280px"} height={"380px"} loading={isLoading}>
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
    </Skeleton>
  );
};

export default GroupTrees;
