import BookingTable from "../../features/bookings/booking-table";
import BookingTableOperations from "../../features/bookings/booking-table-operations";
import Heading from "../../components/heading/heading";
import Row from "../../components/row/row";
import Spinner from "../../components/spinner/spinner";
import useBookings from "../../features/bookings/hooks/use-bookings";

function Bookings() {
  const { isLoading } = useBookings();
  isLoading && <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
