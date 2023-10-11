import styled from "styled-components";

import useBooking from "../bookings/hooks/use-booking";
import Spinner from "../../components/spinner/spinner";
import { useMoveBack } from "../../utils/hooks/use-move-back";
import Error from "../../components/error-fallback/error-fallback";
import ButtonText from "../../components/button-text/button-text";
import Row from "../../components/row/row";
import BookingDataBox from "../bookings/booking-data-box";
import ButtonGroup from "../../components/button-group/button-group";
import Button from "../../components/button/button";
import Heading from "../../components/heading/heading";
import Checkbox from "../../components/check-box/check-box";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/helpers/helpers";
import useCheckIn from "../bookings/hooks/use-check-in";

import useSettings from "../settings/hooks/use-settings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  const {
    booking,
    bookingId: errorId,
    error,
    isLoading: isLoadingBooking
  } = useBooking();
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [haveBreakfast, setHaveBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const checkIsPaid = booking?.isPaid ?? false;
  const checkHaveBreakfast = booking?.hasBreakfast ?? false;
  useEffect(() => {
    setConfirmPayment(checkIsPaid);
  }, [checkIsPaid]);
  useEffect(() => {
    setHaveBreakfast(checkHaveBreakfast);
  }, [checkHaveBreakfast]);
  if (isLoadingBooking || isLoadingSettings) return <Spinner />;
  if (error || !booking)
    return (
      <Error>
        <>
          <p>Booking #{errorId} not found</p>
          <ButtonText onClick={moveBack}>&larr; Go Back</ButtonText>
        </>
      </Error>
    );

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  const handleCheckIn = () => {
    if (!confirmPayment) return;
    if (haveBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      });
    } else {
      checkIn({
        bookingId,
        breakfast: {}
      });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            disabled={hasBreakfast}
            id="breakfast"
            checked={haveBreakfast}
            onChange={() => setHaveBreakfast((isTrue) => !isTrue)}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={booking.isPaid}
          id="confirm"
          checked={confirmPayment}
          onChange={() => setConfirmPayment((isPaid) => !isPaid)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!haveBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})  `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckIn}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
