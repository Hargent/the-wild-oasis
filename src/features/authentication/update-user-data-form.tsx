import { Form } from "react-router-dom";
import Button from "../../components/button/button";
import useGetUser from "./hooks/use-get-user";
import { useState } from "react";
import FormRow from "../../ui/form-row/form-row";
import Input from "../../components/input/input";
import FileInput from "../../components/file-input/file-input";

import useUploadUserImage from "./hooks/use-upload-user-image";
import toast from "react-hot-toast";
import useUpdateUserMetaDat from "./hooks/use-update-user";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { userData } = useGetUser();
  const { updateUserMetaData, isUpdating } = useUpdateUserMetaDat();

  const email = userData?.email;
  const { uploadUserImage, isUploading, isUploadError } = useUploadUserImage();
  const currentFullName = userData?.user_metadata?.fullName;
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatar(file);
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    console.log(avatar, fullName);

    const newAvatar = typeof avatar === "string" ? avatar : avatar?.[0] ?? null;

    if (typeof newAvatar !== "string") {
      uploadUserImage(newAvatar, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    }
    console.log(isUploadError);

    const userUpdateData = {
      fullName,
      avatar
    };
    if (!isUploadError && !isUploading) {
      updateUserMetaData(userUpdateData, {
        onSuccess: () => {
          toast.success("User Account successfully Updated");
          setFullName("");
          setAvatar(null);
        },
        onError: (error) => {
          const errorMessage = error as { [key: string]: string };

          if (errorMessage?.message === "User already registered") {
            toast.error("User Account already exists");
          }
          toast.error("Error signing up new user");
        }
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUploading || isUpdating}
          onChange={handleFileChange}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
