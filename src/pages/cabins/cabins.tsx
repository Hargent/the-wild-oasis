import AddCabin from "../../features/cabins/add-cabin";
import CabinTable from "../../features/cabins/cabins-table";
import CabinTableOperations from "../../features/cabins/cabin-table-operations";
import Heading from "../../components/heading/heading";
import React from "react";
import Row from "../../components/row/row";

const Cabins: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
