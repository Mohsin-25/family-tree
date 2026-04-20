import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";
import { useAppToast } from "../../../../components/Toast";
import { useNavigate } from "@tanstack/react-router";

export const useGetLoggedin = () => {
  const { showToast } = useAppToast();
  const navigate = useNavigate();

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
        const img = document.getElementById("login-page-bg");
        const form = document.getElementById("login-page-form");

        setTimeout(() => {
          localStorage.setItem("token", res?.data?.token);

          form?.classList.add(
            "opacity-0",
            "transition-opacity",
            "duration-2000",
            "ease-in-out",
          );
        }, 500);

        setTimeout(() => {
          img?.classList.add(
            "scale-[300]",
            "transition-scale",
            "duration-5000",
            "ease-in-out",
          );
        }, 1000);

        setTimeout(() => {
          navigate({
            to: "/dashboard",
            // state: {
            //   fromLogin: true,
            // },
          });
        }, 3500);
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
