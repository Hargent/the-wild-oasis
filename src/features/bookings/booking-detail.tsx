import BookingDataBox from "./booking-data-box";
import Button from "../../components/button/button";
import ButtonGroup from "../../components/button-group/button-group";
import ButtonText from "../../components/button-text/button-text";
import Heading from "../../components/heading/heading";
import Row from "../../components/row/row";
import Tag from "../../components/tag/tag";
import styled from "styled-components";
import { useMoveBack } from "../../utils/hooks/use-move-back";

import useBooking from "./hooks/use-booking";
import Spinner from "../../components/spinner/spinner";
import Error from "../../components/error-fallback/error-fallback";
import { useNavigate } from "react-router-dom";
import useCheckOut from "./hooks/use-check-out";
import useDeleteBooking from "./hooks/use-delete-booking";
import Modal from "../../ui/modal/modal";
import ConfirmDelete from "../../ui/confirm-delete/confirm-delete";
// import { useParams } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail: React.FC = () => {
  const { booking, isLoading, error, bookingId: errorId } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, DeleteBooking } = useDeleteBooking();

  if (isLoading || isCheckingOut || isDeleting) return <Spinner />;
  if (error || !booking)
    return (
      <Error>
        <>
          <p>Booking #{errorId} not found</p>
          <ButtonText onClick={moveBack}>&larr; Go Back</ButtonText>
        </>
      </Error>
    );

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver"
  };
  // const { bookingId: errorId } = useParams();

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={status as keyof typeof statusToTagName}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" ? (
            status === "checked-in" ? (
              <Button onClick={() => checkOut(bookingId)}>Check Out</Button>
            ) : (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check In
              </Button>
            )
          ) : status === "checked-in" ? (
            <Button onClick={() => checkOut(bookingId)}>Check Out</Button>
          ) : (
            <></>
          )}

          <Modal.Open opens="confirm-delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() =>
              DeleteBooking(bookingId, {
                onSettled: () => navigate(-1)
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default BookingDetail;
