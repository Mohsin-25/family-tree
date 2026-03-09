import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../api/httpRequest";
import { useAppToast } from "../../../components/Toast";

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
    trees: data?.data || [],
    isLoading,
  };
};

export const useCreateTree = ({ setPopup }: { setPopup?: any }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      httpRequest({
        url: "/trees/",
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });

      if (res?.status && res?.data?._id) {
        setPopup(false);
        queryClient.invalidateQueries({
          queryKey: ["userTrees"],
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

export const useDeleteTree = ({ treeId }: { treeId?: any }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      httpRequest({
        url: `/trees/${treeId}/deleteTree`,
        method: httpMethods.delete,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });

      if (res?.status) {
        queryClient.invalidateQueries({
          queryKey: ["userTrees"],
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
