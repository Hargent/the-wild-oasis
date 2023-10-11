import { BookingData } from "../../utils/types/bookings-types";
import BookingRow from "./booking-row";
import Menus from "../../ui/menus/menus";
import Pagination from "../../ui/pagination/pagination";
import Spinner from "../../components/spinner/spinner";
import Table from "../../ui/table/table";
import useBookings from "./hooks/use-bookings";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings as BookingData[] | []}
          render={(renderData: BookingData) => (
            <BookingRow key={renderData.id} booking={renderData} />
          )}
        />
        <Table.Footer>
          <Pagination count={count ? count : 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
