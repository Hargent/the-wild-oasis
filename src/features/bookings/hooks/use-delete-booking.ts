import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../../services/api-bookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: DeleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully deleted`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error(`Error occurred while deleting booking`);
    }
  });
  return { isDeleting, DeleteBooking };
};
export default useDeleteBooking;
