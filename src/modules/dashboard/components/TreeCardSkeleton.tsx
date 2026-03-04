import { Skeleton } from "@radix-ui/themes";

const TreeCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-min border border-dashed border-extraLightGray rounded-lg shadow-lg items-center justify-center">
      <Skeleton width={"280px"} height={"160px"} loading={true} />
      <Skeleton
        width={"240px"}
        height={"110px"}
        className="m-4"
        loading={true}
      />
      <div className="flex flex gap-4 px-4 pb-4">
        <Skeleton width={"172px"} height={"40px"} loading={true} />
        <Skeleton width={"50px"} height={"40px"} loading={true} />
      </div>
    </div>
  );
};

export default TreeCardSkeleton;
