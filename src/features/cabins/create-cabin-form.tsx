import { FieldErrors, FieldValues, useForm } from "react-hook-form";

import Button from "../../components/button/button";
import FileInput from "../../components/file-input/file-input";
import Form from "../../components/form/form";
import FormRow from "../../ui/form-row/form-row";
import Input from "../../components/input/input";
import Textarea from "../../components/text-area/text-area";
import useCreateCabin from "./hooks/use-create-cabin";
import useDeleteCabin from "./hooks/use-delete-cabin";
import useUploadCabinImage from "./hooks/use-upload-cabin-image";

// import useUploadCabinImage from "./use-upload-cabin-image";
// import { CabinImageBasePath } from "../../services/url";
// import toast from "react-hot-toast/headless";

type Props = {
  onCloseModal?: () => void;
};
const CreateCabinForm: React.FC<Props> = ({ onCloseModal }) => {
  const CURRENT_DISCOUNT = 0.4;

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { isUploading, uploadCabinImage } = useUploadCabinImage();

  const { isCreating, createCabin } = useCreateCabin();

  const { deleteCabin } = useDeleteCabin();

  const onSubmitCabinForm = (data: FieldValues) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    let cabinId: number = 0;
    if (typeof image !== "string") {
      uploadCabinImage(image, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);

          deleteCabin(cabinId);
        }
      });
    }

    createCabin(
      { ...data, image: image },
      {
        onSuccess: (data) => {
          cabinId = data[0].id;

          reset();
          if (!isUploading) onCloseModal?.();
        }
      }
    );
  };

  const { errors } = formState;

  const onError = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitCabinForm, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message as string}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Maximum Capacity should be greater 1"
            }
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message as string}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 100,
              message: "Cabin with the lowest price is 100 dollars"
            }
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message as string}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= CURRENT_DISCOUNT * getValues().regularPrice ||
              `Discount should not be greater than ${
                CURRENT_DISCOUNT * 100
              }% of the regular price`
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message as string}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message as string}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", { required: "No Image file chosen" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
