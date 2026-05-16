import { useParams } from "@tanstack/react-router";
import { useGetActivityLog } from "./services.ts/service";
import { Card } from "../../components/ui/card";
import ActivityCard from "./components/ActivityCard";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

const ActivityLog = () => {
  const { id } = useParams({ from: "/myTree/$id" });

  const { activityLog } = useGetActivityLog(id);

  const groupedActivities = Object.groupBy(activityLog || [], ({ createdAt }) =>
    dayjs(createdAt).format("DD MMMM YYYY"),
  );

  return (
    <Card className="w-full bg-white p-5 gap-3 relative flex">
      <p className="font-medium">Activity Logs</p>
      <p className="text-[14px] -mt-2 text-gray-500">
        See who made changes and when
      </p>

      <hr className="text-gray-300 w-[calc(100%+40px)] -ml-5" />

      {Object.entries(groupedActivities)?.map(([key, value], index) => {
        const parsedDate = dayjs(key);

        const date = parsedDate.isSame(dayjs(), "day")
          ? "Today"
          : parsedDate.isSame(dayjs().subtract(1, "day"), "day")
            ? "Yesterday"
            : key;

        return (
          <div className="relative">
            <div className="flex w-full">
              <span className="flex items-center justify-center gap-1 ml-auto mr-auto text-gray-600 text-[12px] bg-[#e5e5e5] py-1 px-2 rounded-sm">
                <CalendarDays size={14} /> {date}
              </span>
            </div>
            {(value || [])?.map((itm, idx) => {
              const isActivityDoneByLoggedInUser =
                itm?.userName === localStorage.getItem("fullName");
              return (
                <div
                  className={`my-2 !min-w-[80%] !max-w-[90%] ${isActivityDoneByLoggedInUser ? "ml-auto" : "mr-auto"}`}
                >
                  <ActivityCard
                    item={itm}
                    index={index + idx}
                    isActivityDoneByLoggedInUser={isActivityDoneByLoggedInUser}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </Card>
  );
};

export default ActivityLog;
