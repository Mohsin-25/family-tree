import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppToast } from "../../../components/Toast";
import { httpMethods, httpRequest } from "../../../api/httpRequest";
import { useNavigate } from "@tanstack/react-router";

export const useGenerateInviteToken = () => {
  const { showToast } = useAppToast();

  const { mutate, data, isPending } = useMutation({
    mutationFn: (payload: any) =>
      httpRequest({
        method: httpMethods.post,
        url: "/invite/generateToken",
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });
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

  return {
    mutate,
    data,
    isPending,
  };
};

export const useGetInviteData = ({ id }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["invitation", id],
    queryFn: () =>
      httpRequest({
        method: httpMethods.get,
        url: `/invite/${id}`,
      }),
    enabled: !!id,
  });
  return {
    data: data?.data,
    isLoading,
  };
};

export const useAcceptInvitation = ({ id, treeId }: any) => {
  const { showToast } = useAppToast();
  const navigate = useNavigate();

  const { data, mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      httpRequest({
        method: httpMethods.post,
        url: `invite/${id}/accept`,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });
      if (res?.status) {
        setTimeout(() => {
          navigate({ to: `/myTree/${treeId}` });
        }, 3000);
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
  return {
    data,
    mutate,
    isPending,
  };
};
