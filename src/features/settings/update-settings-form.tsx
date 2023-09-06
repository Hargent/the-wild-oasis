import Form from "../../components/form/form";
import FormRow from "../../ui/form-row/form-row";
import Input from "../../components/input/input";
import React from "react";
import Spinner from "../../components/spinner/spinner";
import useSettings from "./hooks/use-settings";
import useUpdateSetting from "./hooks/use-update-settings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength
    } = {},
    error
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();
  if (error) {
    return <div>Error getting settings</div>;
  }
  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateSetting = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) => {
    const value = e.target.value;
    if (!value) return;
    const newSettings = { [field]: value };
    updateSetting(newSettings);
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
