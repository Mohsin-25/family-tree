import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";

export const useGetSignin = ({ setIsLogin }: { setIsLogin?: any }) => {
  const { mutate, isPending, reset } = useMutation({
    mutationFn: (payload: { userName: string; password: string }) => {
      return httpRequest({
        url: "/users/signIn",
        method: httpMethods.post,
        payload,
      });
    },
    onSuccess: (res) => {
      console.log("fff res", res);

      reset();
      if (res?.userName) {
        setIsLogin(true);
        // showSuccessToast("", res);
      } else {
        reset();
      }
    },
    onError: (err: any) => {
      console.log("fff err", err);

      reset();
      if (err?.response.data.message) {
        // showErrorToast("Failure", err?.response?.data?.message);
      }
    },
  });
  return {
    mutate,
    isPending,
  };
};
