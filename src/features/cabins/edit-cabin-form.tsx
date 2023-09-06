import { FieldErrors, FieldValues, useForm } from "react-hook-form";

import Button from "../../components/button/button";
import { CabinData } from "../../utils/types/cabin";
import FileInput from "../../components/file-input/file-input";
import Form from "../../components/form/form";
import FormRow from "../../ui/form-row/form-row";
import Input from "../../components/input/input";
import Textarea from "../../components/text-area/text-area";
import useEditCabin from "./hooks/use-edit-cabin";
import useUploadCabinImage from "./hooks/use-upload-cabin-image";

type Props = {
  cabinEditData: CabinData;
  onCloseModal?: () => void;
};

const EditCabinForm: React.FC<Props> = ({ cabinEditData, onCloseModal }) => {
  const CURRENT_DISCOUNT = 0.4;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinEditData
  });
  const { isUploading, uploadCabinImage } = useUploadCabinImage();

  const { isEditing, editCabin } = useEditCabin();

  const onSubmitCabinForm = (data: FieldValues) => {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (typeof image !== "string") {
      uploadCabinImage(image, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    }

    editCabin(
      {
        newCabinData: {
          ...data,
          image: image,
          discount: Number(data.discount)
        },
        id: cabinEditData.id
      },
      {
        onSuccess: (data) => {
          console.log(data);

          reset();
          if (!isUploading && !isEditing) onCloseModal?.();
        },
        onError: (error) => {
          console.log(error);
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message as string}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isEditing}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isEditing}>Edit cabin</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default EditCabinForm;
