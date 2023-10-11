import { format, isToday } from "date-fns";
import {
  formatCurrency,
  formatDistanceFromNow
} from "../../utils/helpers/helpers";

import { BookingData } from "../../utils/types/bookings-types";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash
} from "react-icons/hi2";
import Menus from "../../ui/menus/menus";
import Table from "../../ui/table/table";
import Tag from "../../components/tag/tag";
import { statusToTagName } from "../../utils/constants/status-to-tag";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCheckOut from "./hooks/use-check-out";
import SpinnerMini from "../../components/spinner-mini/spinner-mini";
import useDeleteBooking from "./hooks/use-delete-booking";
import Modal from "../../ui/modal/modal";
import ConfirmDelete from "../../ui/confirm-delete/confirm-delete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowProps = {
  booking: BookingData;
};

const BookingRow: React.FC<BookingRowProps> = ({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName }
  }
}) => {
  // console.log(bookingId, created_at, numGuests);
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, DeleteBooking } = useDeleteBooking();

  {
    isDeleting && <SpinnerMini />;
  }
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      {isCheckingOut ? (
        <SpinnerMini />
      ) : (
        <Tag type={status as keyof typeof statusToTagName}>
          {status.replace("-", " ")}
        </Tag>
      )}

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" ? (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            ) : (
              <></>
            )}
            {status === "checked-in" ? (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(bookingId)}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            ) : (
              <></>
            )}
            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<HiTrash />} disabled={isCheckingOut}>
                Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => DeleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
