import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Login } from "../../../services/api-auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: LoginUser, isLoading: isLogingIn } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("User successfully logged in");
      navigate("/dashboard", {
        replace: true
      });
    },
    onError: () => {
      toast.error("Error encountered while logging in user");
    }
  });
  return { LoginUser, isLogingIn };
};
export default useLogin;
