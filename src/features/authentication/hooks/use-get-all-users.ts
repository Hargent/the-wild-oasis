import { getAllUsers } from "../../../services/api-auth";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const { data: allUsers, isLoading: isLoadingUsers } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"]
  });

  return { isLoadingUsers, allUsers };
};
export default useGetAllUsers;
