import { useParams } from "@tanstack/react-router";
import { useGetActivityLog } from "./services.ts/service";
import { Card } from "../../components/ui/card";
import ActivityCard from "./components/ActivityCard";

const ActivityLog = () => {
  const { id } = useParams({ from: "/myTree/$id" });

  const { activityLog } = useGetActivityLog(id);

  console.log("eee", activityLog);

  return (
    <div>
      <Card className="w-full bg-white p-5 gap-3">
        <p className="font-medium">Activity Logs</p>
        <p className="text-[14px] -mt-2 text-gray-500">
          See who made changes and when
        </p>

        <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

        {activityLog?.map((item: any, index: any) => {
          return <ActivityCard item={item} index={index} />;
        })}
      </Card>
    </div>
  );
};

export default ActivityLog;
