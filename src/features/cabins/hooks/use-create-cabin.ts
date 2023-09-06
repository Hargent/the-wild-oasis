import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCabin as CreateCabinApi } from "../../../services/api-cabins";
import toast from "react-hot-toast/headless";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createCabin,
    isLoading: isCreating,
    data
  } = useMutation({
    mutationFn: CreateCabinApi,
    onSuccess: () => {
      toast.success("New Cabin successfully created 🤝");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },

    onError: (err: { [key: string]: string }) => toast.error(`${err.message}`)
  });

  return { isCreating, createCabin, data };
};

export default useCreateCabin;
