import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";
import { useAppToast } from "../../../components/Toast";

export const getFamilyTree = (id: any) => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["tree", id],
    queryFn: () => {
      return httpRequest({ url: `/trees/${id}`, method: httpMethods.get });
    },
  });

  return {
    treeData: data?.data,
    isFetching,
    isLoading: isLoading || isFetching,
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
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: {
      name: string;
      gender: string;
      dob: string;
      maritalStatus: string;
      profession: string;
    }) =>
      httpRequest({
        url: `/trees/${treeId}/persons`,
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });

      if (res?.status && res?.data?._id) {
        setPopup({ data: {}, state: false });
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
    onError: (err: any) => {
      if (err?.message) {
        showToast({
          description: err?.message,
          status: err?.status,
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
  const { showToast } = useAppToast();

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
      showToast({
        description: res?.message,
        status: res?.status,
      });

      if (res?.status && res?.data?._id) {
        setPopup({ data: {}, state: false });
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
    onError: (err: any) => {
      if (err?.message) {
        showToast({
          description: err?.message,
          status: err?.status,
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
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { relativeId: String; relationId: Number }) =>
      httpRequest({
        url: `/trees/${treeId}/persons/${personId}`,
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });

      if (res?.status) {
        setPopup({ data: {}, state: false });
        queryClient.invalidateQueries({
          queryKey: ["tree"],
        });
      }
    },
    onError: (err: any) => {
      if (err?.message) {
        showToast({
          description: err?.message,
          status: err?.status,
        });
      }
    },
  });

  return { mutate, isPending };
};

export const useMarkAsRootPerson = ({
  useServiceResponse = true,
}: {
  useServiceResponse?: boolean;
} = {}) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { treeId: String; personId: String }) =>
      httpRequest({
        url: `/trees/${payload?.treeId}/set-root/${payload?.personId}`,
        method: httpMethods.post,
      }),
    onSuccess: (res) => {
      if (useServiceResponse) {
        showToast({
          description: res?.message,
          status: res?.status,
        });

        if (res?.status) {
          queryClient.invalidateQueries({
            queryKey: ["tree"],
          });
        }
      }
    },
    onError: (err: any) => {
      if (err?.message) {
        showToast({
          description: err?.message,
          status: err?.status,
        });
      }
    },
  });

  return { mutate, isPending };
};
