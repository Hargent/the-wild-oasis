import { useMutation } from "@tanstack/react-query";
import { updateUserMetaData as updateUserMetaDataApi } from "../../../services/api-auth";

const useUpdateUserMetaDat = () => {
  const { mutate: updateUserMetaData, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserMetaDataApi
  });

  return { updateUserMetaData, isUpdating };
};
export default useUpdateUserMetaDat;
