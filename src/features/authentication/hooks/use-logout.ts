import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutUser } from "../../../services/api-auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("User successfully logged out");
      navigate("/login", {
        replace: true
      });
    },
    onError: () => {
      toast.error("Error encountered while logging out user");
    }
  });
  return { logout, isLoggingOut };
};
export default useLogout;
