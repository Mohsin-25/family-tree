import { useQuery } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";

export const getFamilyTree = (id: any) => {
  const { data, isFetching } = useQuery({
    queryKey: ["tree", id],
    queryFn: () => {
      return httpRequest({ url: `/trees/${id}`, method: httpMethods.get });
    },
  });
  return {
    treeData: data,
    isFetching,
  };
};
