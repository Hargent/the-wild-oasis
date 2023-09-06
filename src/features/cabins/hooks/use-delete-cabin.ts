import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../../services/api-cabins";
import toast from "react-hot-toast/headless";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (err: { [key: string]: string }) => toast.error(`${err.message}`)
  });
  return { isDeleting, deleteCabin };
};
export default useDeleteCabin;
