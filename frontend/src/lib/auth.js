import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import { api } from "./apiClient"

export const getUser = async () => {
  const response = (await api.get("/auth/me"));
  return response.user ?? response;
}

export const userQueryKey = ["user"];

export const useUser = () => 
  useQuery({
    queryKey: userQueryKey,
    queryFn: getUser,
    enabled: Boolean(localStorage.getItem("access_token")),
  });

export const useLogin = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.token);
      queryClient.invalidateQueries(userQueryKey);
      onSuccess?.();
    },
  });
};

export const useSignup = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.token);
      queryClient.invalidateQueries(userQueryKey);
      onSuccess?.();
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: userQueryKey });
  };
};

const loginRequest = (data) => {
  return api.post("/auth/login", data, { auth: false });
};

const signupRequest = (data) => {
  return api.post("/auth/signup", data, { auth: false });
};