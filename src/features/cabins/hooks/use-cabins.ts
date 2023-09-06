import { getCabins } from "../../../services/api-cabins";
import { useQuery } from "@tanstack/react-query";

const useCabins = () => {
  const {
    data: cabins,
    isLoading,
    error
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  });

  return { isLoading, cabins, error };
};
export default useCabins;
