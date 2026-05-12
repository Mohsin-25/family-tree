import { useMutation } from "@tanstack/react-query";
import { httpMethods, httpRequest } from "../../../../api/httpRequest";
import { useAppToast } from "../../../../components/Toast";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useGetVerificationCode = ({ setForm }: any) => {
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
        setForm((prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            ...res.data,
          },
          type: "verify-code",
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

export const useVerifyCode = ({ setForm }: any) => {
  const { showToast } = useAppToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      httpRequest({
        url: "/verify/verification-code",
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });
      if (res.status) {
        setForm((prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            ...res.data,
          },
          type: "new-password",
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

export const useChangePassword = () => {
  const { showToast } = useAppToast();
  const navigate = useNavigate();

  const search = useSearch({ from: "/forgotPassword" });
  const redirectTo = search.redirectTo;

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      httpRequest({
        url: "/verify/reset-password",
        method: httpMethods.post,
        payload,
      }),
    onSuccess: (res) => {
      showToast({
        description: res?.message,
        status: res?.status,
      });
      if (res.status) {
        setTimeout(() => {
          navigate({
            to: "/signIn",
            search: {
              redirectTo,
            },
          });
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
    mutate,
    isPending,
  };
};
