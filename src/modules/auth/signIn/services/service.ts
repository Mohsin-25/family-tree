import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";
import { useAppToast } from "../../../../components/Toast";

export const useGetSignin = ({ setIsLogin }: { setIsLogin?: any }) => {
  const { showToast } = useAppToast();
  const { mutate, isPending, reset } = useMutation({
    mutationFn: (payload: { userName: string; password: string }) => {
      return httpRequest({
        url: "/users/signIn",
        method: httpMethods.post,
        payload,
      });
    },
    onSuccess: (res) => {
      reset();
      showToast({
        description: res?.message,
        status: res?.status,
      });
      if (res?.status) {
        setIsLogin(true);
      } else {
        reset();
      }
    },
    onError: (err: any) => {
      reset();
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
