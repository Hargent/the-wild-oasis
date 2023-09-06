import AddCabin from "../../features/cabins/add-cabin";
import CabinTable from "../../features/cabins/cabins-table";
import Heading from "../../components/heading/heading";
import React from "react";
import Row from "../../components/row/row";

const Cabins: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
