import { useQuery, useQueryClient } from "@tanstack/react-query";

import { NO_OF_ITEMS_PER_PAGE } from "../../../utils/constants/page-size";
import { getBookings } from "../../../services/api-bookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });
  // PRE FETCHING
  const pageCount = Math.ceil(count ? count / NO_OF_ITEMS_PER_PAGE : 0);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });
  }
  
  return { isLoading, bookings, error, count };
};
export default useBookings;

  //
  // const FilterValues = {
  //   All: "all",
  //   CHECKED_IN: "checked-in",
  //   CHECKED_OUT: "checked-out",
  //   UNCONFIRMED: "unconfirmed"
  // };

  // const [searchParams] = useSearchParams();
  // const sortBy = searchParams.get("sortBy") || "startDate-desc";
  // const filterValue = searchParams.get("status") || "all";

  // // if (!bookings?.length) return <Empty resourceName={"bookings"} />;
  // // filter
  // let filteredBookings = bookings;
  // switch (filterValue) {
  //   case FilterValues.All:
  //     filteredBookings = bookings;
  //     break;
  //   case FilterValues.CHECKED_IN:
  //     filteredBookings = bookings?.filter(
  //       (booking) => booking.status === FilterValues.CHECKED_IN
  //     );
  //     break;
  //   case FilterValues.UNCONFIRMED:
  //     filteredBookings = bookings?.filter(
  //       (booking) => booking.status === FilterValues.UNCONFIRMED
  //     );
  //     break;
  //   case FilterValues.CHECKED_OUT:
  //     filteredBookings = bookings?.filter(
  //       (booking) => booking.status === FilterValues.CHECKED_OUT
  //     );
  //     break;
  //   default:
  //     filteredBookings = bookings;
  // }

  // // sort
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedBookings =
  //   filteredBookings?.sort(
  //     (a, b) =>
  //       (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0) * modifier
  //   ) ?? [];
