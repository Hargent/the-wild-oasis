import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast/headless";
import { updateSetting as updateSettingApi } from "../../../services/api-settings";

const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully Updated 🤝");
      queryClient.invalidateQueries({
        queryKey: ["Settings"]
      });
    },

    onError: (err: { [key: string]: string }) => toast.error(`${err.message}`)
  });

  return { isUpdating, updateSetting };
};

export default useUpdateSetting;
