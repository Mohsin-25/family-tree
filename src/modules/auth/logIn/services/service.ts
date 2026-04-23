import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";
import { useAppToast } from "../../../../components/Toast";
import { useSearch } from "@tanstack/react-router";

export const useGetLoggedin = () => {
  const { redirectTo } = useSearch({ from: "/signIn" });

  const { showToast } = useAppToast();
  const { mutate, isPending, reset } = useMutation({
    mutationFn: (payload: { userName: string; password: string }) => {
      return httpRequest({
        url: "/users/logIn",
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
      if (res?.data?.token) {
        setTimeout(() => {
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("fullName", res?.data?.user?.fullName);
          window.location.href = redirectTo ? redirectTo : "/dashboard";
        }, 1500);
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
