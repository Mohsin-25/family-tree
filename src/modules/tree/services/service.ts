import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";

export const getFamilyTree = (id: any) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["tree", id],
    queryFn: () => {
      return httpRequest({ url: `/trees/${id}`, method: httpMethods.get });
    },
  });
  return {
    treeData: data,
    isFetching,
    isLoading,
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

export const useUpdatePerson = ({
  setPopup,
  treeId,
  personId,
}: {
  setPopup?: any;
  treeId?: any;
  personId?: any;
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
        url: `/trees/${treeId}/persons/${personId}`,
        method: httpMethods.put,
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

export const useLinkPerson = ({
  setPopup,
  treeId,
  personId,
}: {
  setPopup?: any;
  treeId?: any;
  personId?: any;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { relativeId: String; relationId: Number }) =>
      httpRequest({
        url: `/trees/${treeId}/persons/${personId}`,
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      if (res) {
        setPopup({ data: {}, state: false });
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
  });

  return { mutate, isPending };
};

export const useMarkAsRootPerson = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { treeId: String; personId: String }) =>
      httpRequest({
        url: `/trees/${payload?.treeId}/set-root/${payload?.personId}`,
        method: httpMethods.post,
      }),
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
  });

  return { mutate, isPending };
};
