import dayjs from "dayjs";

const ActivityCard = ({ item, index, isActivityDoneByLoggedInUser }: any) => {
  // const activityMapping: any = {
  //   PERSON_UPDATED: "updated",
  //   PERSON_CREATED: "added",
  //   TREE_CREATED: "created",
  // };

  // const fieldMapping: any = {
  //   fields: {
  //     maritalStatus: "marital status",
  //     profession: "about section",
  //   },

  //   gender: {
  //     M: "Male",
  //     F: "Female",
  //   },

  //   maritalStatus: {
  //     S: "Single",
  //     M: "Married",
  //   },
  // };

  // const getMappedValue = (field: string, value: string) => {
  //   if (field === "gender") {
  //     return fieldMapping.gender?.[value] || value;
  //   }

  //   if (field === "maritalStatus") {
  //     return fieldMapping.maritalStatus?.[value] || value;
  //   }

  //   return value;
  // };

  // const changes = (arr) => {
  //   return arr
  //     ?.filter((it) => it?.field !== "updatedBy")
  //     .map((itm) => {
  //       const label = fieldMapping.fields?.[itm?.field] || itm?.field;

  //       return itm?.field === "photo"
  //         ? !itm?.oldValue?.url
  //           ? `Added ${label}`
  //           : !itm?.newValue?.url
  //             ? `Removed ${label}`
  //             : `Changed ${label}`
  //         : !itm?.oldValue
  //           ? `Added ${label} ${getMappedValue(itm?.field, itm?.newValue)}`
  //           : !itm?.newValue
  //             ? `Removed ${label}`
  //             : `Changed ${label} from ${getMappedValue(
  //                 itm?.field,
  //                 itm?.oldValue,
  //               )} to ${getMappedValue(itm?.field, itm?.newValue)}`;
  //     });
  // };

  const getInitials = (name = "") => {
    return name.trim().split(/\s+/)?.[0]?.[0]?.toUpperCase();
    // .map((word) => word[0]?.toUpperCase())
    // .join(" ");
  };

  const summary = item?.summary
    ?.replace(item?.userName, "")
    ?.replaceAll("updatedBy,", "")
    ?.replaceAll(", updatedBy", "")
    ?.trim();

  const finalSummary = summary?.charAt(0)?.toUpperCase() + summary?.slice(1);

  const ChatArrow = ({ className }: any) => {
    return (
      <div className={className}>
        <div
          className="w-0 h-0 
        border-l-20 border-l-transparent
            border-t-12 border-t-[#e5e5e5]
            absolute -left-5 -top-px"
        ></div>
        <div
          className="w-0 h-0 
        border-l-20 border-l-transparent
        border-t-12 border-t-transparent
        absolute -left-[17.5px] top-0"
        ></div>
      </div>
    );
  };

  return (
    <div
      key={index}
      className={`relative text-white flex text-sm border rounded-md px-3 py-2 ${isActivityDoneByLoggedInUser ? "flex-row-reverse mr-6 rounded-tr-none" : "flex-row ml-6 rounded-tl-none"}`}
    >
      <div
        className={`absolute top-2.5 flex text-[12px] shrink-0 size-7 items-center justify-center rounded-full bg-[#e5e5e5] text-gray-600  ${isActivityDoneByLoggedInUser ? "-right-9 " : "-left-9 "}`}
      >
        {getInitials(item?.userName)}
      </div>

      <ChatArrow
        className={
          isActivityDoneByLoggedInUser
            ? "scale-x-[-1] absolute top-0 right-0"
            : ""
        }
      />

      <div className={`flex gap-1 flex-col w-full`}>
        <div
          className={`flex ${isActivityDoneByLoggedInUser ? "flex-row-reverse" : "flex-row"} justify-between align-middle`}
        >
          <span>
            <span className="font-semibold">{item?.userName}</span>{" "}
          </span>
          <span className="text-[12px] text-gray-500">
            {dayjs(item?.updatedAt).format("hh:mm A") ||
              dayjs(item?.createdAt).format("hh:mm A")}
          </span>
        </div>
        <p
          className={`${isActivityDoneByLoggedInUser ? "text-right" : "text-left"}`}
        >
          <span className="">{finalSummary}.</span>
        </p>
      </div>
    </div>
  );

  //   return (
  //     <div key={index} className="flex gap-3 border rounded-md p-3">
  //       <div className="flex text-[12px] font-semibold w-12 h-12 items-center justify-center rounded-sm bg-secondary p-2 text-white">
  //         {/* <User /> */}
  //         {getInitials(item?.userName)}
  //       </div>
  //       <div className="flex flex-col text-sm w-full">
  //         <div className="flex justify-between align-middle">
  //           <span>
  //             <span className="font-semibold">{item?.userName}</span>{" "}
  //             <span className="">
  //               {/* {item?.action} */}
  //               {activityMapping?.[item?.action] || item?.action}
  //             </span>{" "}
  //             <span className="font-semibold">
  //               {item?.entityId?.name || item?.entityId?.title}
  //             </span>
  //           </span>
  //           <span className="text-[12px] text-gray-400">
  //             {dayjs(item?.updatedAt).format("DD-MMM-YYYY | hh:mm a") ||
  //               dayjs(item?.createdAt).format("DD-MMM-YYYY | hh:mm a")}
  //           </span>
  //         </div>
  //         <p>
  //           <span>{changes(item?.changes).join(", ") || item?.summary}</span>
  //         </p>
  //       </div>
  //     </div>
  //   );
};

export default ActivityCard;
