import { useQuery } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";

export const getFamilyTree = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["tree"],
    queryFn: () => {
      return httpRequest({ url: "persons/tree", method: httpMethods.get });
    },
  });
  return {
    data,
    isFetching,
  };
};
