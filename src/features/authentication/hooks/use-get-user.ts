import { getCurrentUser } from "../../../services/api-auth";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const { data: userData, isLoading: isGettingUser } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"]
  });

  return {
    userData,
    isGettingUser,
    isAuthenticated: userData?.aud === "authenticated"
  };
};
export default useGetUser;
