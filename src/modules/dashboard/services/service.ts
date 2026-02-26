import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";

export const getUserTrees = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userTrees"],
    queryFn: () =>
      httpRequest({
        url: "/trees/",
        method: httpMethods.get,
      }),
  });
  return {
    trees: data,
    isLoading,
  };
};

export const useCreateTree = ({ setPopup }: { setPopup?: any }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      httpRequest({
        url: "/trees/",
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      if (res?._id) {
        setPopup(false);
        queryClient.invalidateQueries({
          queryKey: ["userTrees"],
        });
      }
    },
  });

  return { mutate, isPending };
};
