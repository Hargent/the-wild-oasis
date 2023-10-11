import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/api-bookings";
import toast from "react-hot-toast";

const useCheckOut = () => {
  const queryClient = useQueryClient();

  const {
    mutate: checkOut,
    isLoading: isCheckingOut,
    error
  } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out"
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error(`Error occurred while checking Out`);
    }
  });
  return { isCheckingOut, checkOut, error };
};
export default useCheckOut;
