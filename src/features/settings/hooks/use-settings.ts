import { getSettings } from "../../../services/api-settings";
import { useQuery } from "@tanstack/react-query";

const useSettings = () => {
  const {
    data: settings,
    isLoading,
    error
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings
  });

  return { isLoading, settings, error };
};
export default useSettings;
