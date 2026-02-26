import axios, { type AxiosResponse } from "axios";

enum httpMethods {
  get = "GET",
  post = "POST",
  patch = "PATCH",
  put = "PUT",
  delete = "DELETE",
}

interface httpRequestProps<T, U> {
  url: string;
  method: httpMethods;
  options?: T;
  payload?: U;
  params?: any;
}

const api = axios.create({
  baseURL: "https://family-tree-backend-wj7l.onrender.com/api/",
  headers: {
    Accept: "application/json, text/plain",
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});

const httpRequest = async <T, U>({
  url = "",
  method = httpMethods.get,
  options,
  payload,
  params,
}: httpRequestProps<T, U>) => {
  return await api({
    ...options,
    url,
    method: method,
    data: payload,
    params: params,
  })
    .then((response: AxiosResponse<any, any>) => {
      return response?.data;
    })
    .catch((err) => {
      throw err;
    });
};

// const httpRequest = () => {};

const setAxiosAuthHeader = ({ authToken }: { authToken: string }) => {
  api.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
};

export { httpRequest, httpMethods, setAxiosAuthHeader };
