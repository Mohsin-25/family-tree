import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useCreatePerson = ({
  setPopup,
  treeId,
}: {
  setPopup?: any;
  treeId?: any;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: {
      name: string;
      gender: string;
      dob: string;
      maritalStatus: string;
      profession: string;
    }) =>
      httpRequest({
        url: `/trees/${treeId}/persons/`,
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      if (res?._id) {
        setPopup({ data: {}, state: false });
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
  });

  return { mutate, isPending };
};
