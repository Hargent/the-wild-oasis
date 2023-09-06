import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editCabin as EditCabinApi } from "../../../services/api-cabins";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast/headless";

const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id
    }: {
      newCabinData: FieldValues;
      id: number;
    }) => EditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully Edited 🤝");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },

    onError: (err: { [key: string]: string }) => toast.error(`${err.message}`)
  });

  return { isEditing, editCabin };
};

export default useEditCabin;
