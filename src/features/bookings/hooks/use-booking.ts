import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/api-bookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false
  });

  return { isLoading, booking, error, bookingId };
};
export default useBooking;
