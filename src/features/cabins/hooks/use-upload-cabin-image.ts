import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadCabinImage as UploadCabinImageApi } from "../../../services/api-cabins";
import toast from "react-hot-toast/headless";

const useUploadCabinImage = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadCabinImage, isLoading: isUploading } = useMutation({
    mutationFn: UploadCabinImageApi,
    onSuccess: () => {
      toast.success("New Image successfully created 🤝");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },

    onError: (err: { [key: string]: string }) => {
      toast.error(`${err.message}`);

      throw new Error(err.message);
    }
  });

  return { isUploading, uploadCabinImage };
};

export default useUploadCabinImage;

