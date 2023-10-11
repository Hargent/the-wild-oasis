import Button from "../../components/button/button";
import Form from "../../components/form/form";
import FormRow from "../../ui/form-row/form-row";
import Heading from "../../components/heading/heading";
import Input from "../../components/input/input";
import Logo from "../../ui/logo/logo";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import useSignUpUser from "./hooks/use-sign-up-user";
import FileInput from "../../components/file-input/file-input";
import useUploadUserImage from "./hooks/use-upload-user-image";
import { useQueryClient } from "@tanstack/react-query";

type SignUpProps = {
  onCloseModal?: () => void;
};
const SignupForm: React.FC<SignUpProps> = ({ onCloseModal }) => {
  const { register, reset, formState, getValues, handleSubmit } = useForm();

  const { signUpUser, isSigningUp } = useSignUpUser();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isUploading, uploadUserImage, isUploadError } = useUploadUserImage();
  const handleSignUp = (data: FieldValues) => {
    console.log(data);

    const avatar =
      typeof data.avatar === "string" ? data.avatar : data.avatar[0];

    if (typeof avatar !== "string") {
      uploadUserImage(avatar, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    }
    console.log(isUploadError);

    if (!isUploadError && !isUploading) {
      signUpUser(
        { ...data, avatar: avatar },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            toast.success("User Account successfully signed up");
            reset();
          },
          onError: (error) => {
            const errorMessage = error as { [key: string]: string };

            if (errorMessage?.message === "User already registered") {
              toast.error("User Account already exists");
            }
            toast.error("Error signing up new user");
          }
        }
      );
    }
  };
  return (
    <>
      <Logo />
      <Heading as="h5">Create a new user</Heading>
      <Form
        onSubmit={handleSubmit(handleSignUp)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Full name" error={errors?.fullName?.message as string}>
          <Input
            type="text"
            disabled={isSigningUp}
            id="fullName"
            {...register("fullName", {
              required: "User full name required."
            })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message as string}>
          <Input
            type="email"
            disabled={isSigningUp}
            id="email"
            {...register("email", {
              required: "User email required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Provide a valid email"
              }
            })}
          />
        </FormRow>
        <FormRow label="Phone Number" error={errors?.phone?.message as string}>
          <Input
            type="phone"
            disabled={isSigningUp}
            id="phone"
            {...register("phone", {
              required: "User phone required.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Provide a valid Phone Number"
              }
            })}
          />
        </FormRow>

        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message as string}
        >
          <Input
            type="password"
            id="password"
            disabled={isSigningUp}
            {...register("password", {
              required: "User password required.",
              minLength: {
                value: 8,
                message: "Minimum of 8 characters required"
              }
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message as string}
        >
          <Input
            type="password"
            disabled={isSigningUp}
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "password confirmation required.",
              validate: (value) =>
                getValues().password === value || "passwords need to match"
            })}
          />
        </FormRow>
        <FormRow label="User photo" error={errors?.avatar?.message as string}>
          <FileInput
            id="avatar"
            accept="image/*"
            disabled={isSigningUp}
            {...register("avatar", { required: "No Image file chosen" })}
          />
        </FormRow>

        <FormRow>
          <>
            {/* type is an HTML attribute! */}
            <Button
              disabled={isSigningUp}
              variation="secondary"
              type="reset"
              onClick={onCloseModal}
            >
              Cancel
            </Button>
            <Button>Create new user</Button>
          </>
        </FormRow>
      </Form>
    </>
  );
};

export default SignupForm;
