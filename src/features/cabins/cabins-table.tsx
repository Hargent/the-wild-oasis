import { CabinData } from "../../utils/types/cabin";
import CabinRow from "./cabin-row";
import Menus from "../../ui/menus/menus";
import React from "react";
import Spinner from "../../components/spinner/spinner";
import Table from "../../ui/table/table";
import useCabins from "./hooks/use-cabins";
import { useSearchParams } from "react-router-dom";

// import styled from "styled-components";

// const StyledTable = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: normal.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
//
// `;
const FilterValues = {
  All: "all",
  NO_DISCOUNT: "no-discount",
  WITH_DISCOUNT: "with-discount"
};
const CabinTable: React.FC = () => {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const filterValue = searchParams.get("discount") || "all";

  // if (!cabins?.length) return <Empty resourceName={"bookings"} />;
  // filter
  let filteredCabins = cabins;
  switch (filterValue) {
    case FilterValues.All:
      filteredCabins = cabins;
      break;
    case FilterValues.NO_DISCOUNT:
      filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
      break;
    case FilterValues.WITH_DISCOUNT:
      filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0);
      break;
    default:
      filteredCabins = cabins;
  }

  // sort
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    filteredCabins?.sort(
      (a, b) =>
        (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0) * modifier
    ) ?? [];

  //
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins as CabinData[]}
          render={(renderData: CabinData) => (
            <CabinRow cabinData={renderData} key={renderData.id} />
          )}
        />
        {/* {cabins?.map((cabin) => (
        <CabinRow cabinData={cabin} key={cabin.id} />
      ))} */}
      </Table>
    </Menus>
    // <StyledTable role="table">
    //   <TableHeader role="row">
    //     <div></div>
    //     <div>Cabin</div>
    //     <div>Capacity</div>
    //     <div>Price</div>
    //     <div>Discount</div>
    //     <div></div>
    //   </TableHeader>
    //   {cabins?.map((cabin) => (
    //     <CabinRow cabinData={cabin} key={cabin.id} />
    //   ))}
    // </StyledTable>
  );
};

export default CabinTable;
