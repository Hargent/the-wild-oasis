import { FieldValues } from "react-hook-form";
import { signUpUser as signUpUserApi } from "../../../services/api-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignUpUser = () => {
  const queryClient = useQueryClient();
  const { mutate: signUpUser, isLoading: isSigningUp } = useMutation({
    mutationFn: (userSignUpData: FieldValues) => signUpUserApi(userSignUpData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });

  return { signUpUser, isSigningUp };
};
export default useSignUpUser;
