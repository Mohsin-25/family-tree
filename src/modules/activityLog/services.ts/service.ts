import { useQuery } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";

export const useGetActivityLog = (id: any) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["activityLog", id],
    queryFn: () => {
      return httpRequest({
        url: `/trees/${id}/activityLog`,
        method: httpMethods.get,
      });
    },
    placeholderData: (prev) => prev,
  });

  return {
    activityLog: data?.data,
    isFetching,
    isLoading,
  };
};
