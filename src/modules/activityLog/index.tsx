import { useParams } from "@tanstack/react-router";
import { useGetActivityLog } from "./services.ts/service";
import { Card } from "../../components/ui/card";
import ActivityCard from "./components/ActivityCard";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { Spinner } from "@radix-ui/themes";

const ActivityLog = () => {
  const { id } = useParams({ from: "/myTree/$id" });

  const { activityLog, isLoading } = useGetActivityLog(id);

  const groupedActivities: Record<string, any[]> = (activityLog || []).reduce(
    (acc: any, activity: any) => {
      const key = dayjs(activity.createdAt).format("DD MMMM YYYY");

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(activity);

      return acc;
    },
    {} as Record<string, any[]>,
  );

  return (
    <Card className="w-full h-full bg-white p-5 gap-3 relative flex">
      <p className="font-medium">Activity Logs</p>
      <p className="text-[14px] -mt-2 text-gray-500">
        Track every change, update, and action across your tree.
      </p>

      <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Spinner loading />
        </div>
      ) : (
        <div>
          {Object.entries(groupedActivities).map(([key, value], index) => {
            const parsedDate = dayjs(key);

            const date = parsedDate.isSame(dayjs(), "day")
              ? "Today"
              : parsedDate.isSame(dayjs().subtract(1, "day"), "day")
                ? "Yesterday"
                : key;

            return (
              <div key={key} className="relative">
                <div className="flex w-full">
                  <span className="flex items-center justify-center gap-1 ml-auto mr-auto text-gray-600 text-[12px] bg-[#e5e5e5] py-1 px-2 rounded-sm">
                    <CalendarDays size={14} /> {date}
                  </span>
                </div>

                {value.map((itm: any, idx: number) => {
                  const isActivityDoneByLoggedInUser =
                    itm?.userId === localStorage.getItem("id");

                  return (
                    <div
                      key={itm?._id || idx}
                      className={`my-4 max-w-[85%] ${
                        isActivityDoneByLoggedInUser ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <ActivityCard
                        item={itm}
                        index={index + idx}
                        isActivityDoneByLoggedInUser={
                          isActivityDoneByLoggedInUser
                        }
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ActivityLog;
