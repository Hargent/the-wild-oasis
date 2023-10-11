import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast/headless";
import { uploadUserImage as UploadUserImageApi } from "../../../services/api-auth";

const useUploadUserImage = () => {
  const {
    mutate: uploadUserImage,
    isLoading: isUploading,
    isError: isUploadError
  } = useMutation({
    mutationFn: UploadUserImageApi,
    onSuccess: () => {
      toast.success("New Image successfully created 🤝");
    },

    onError: (err: { [key: string]: string }) => {
      toast.error(`${err.message}`);

      throw new Error(err.message);
    }
  });

  return { isUploading, uploadUserImage, isUploadError };
};

export default useUploadUserImage;
