import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";
import { useAppToast } from "../../../../components/Toast";

export const useGetVerificationCode = ({ setData }: any) => {
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      httpRequest({
        url: "/verify/forgot-password",
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });
      if (res.status) {
        setData((prev: any) => ({
          ...prev,
          step: 2,
        }));
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
    mutate,
    isPending,
  };
};
