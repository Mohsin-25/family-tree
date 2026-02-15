import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";

export const useGetLoggedin = () => {
  const { mutate, isPending, reset } = useMutation({
    mutationFn: (payload: { userName: string; password: string }) => {
      return httpRequest({
        url: "/users/logIn",
        method: httpMethods.post,
        payload,
      });
    },
    onSuccess: (res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "/myTree";
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
