import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/api-bookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isLoading: isCheckingIn,
    error
  } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast
    }: {
      bookingId: number;
      breakfast: {
        extrasPrice?: number;
        totalPrice?: number;
        hasBreakfast?: boolean;
      };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries(["bookings"]);
      navigate("/");
    },
    onError: () => {
      toast.error(`Error occurred while checking in`);
    }
  });
  return { isCheckingIn, checkIn, error };
};
export default useCheckIn;
