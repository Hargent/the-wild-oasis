import Heading from "../../components/heading/heading";
import Row from "../../components/row/row";
import UsersTable from "../../features/authentication/user-table";

function NewUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Employed Users</Heading>
      </Row>

      <UsersTable />
    </>
  );
}

export default NewUsers;
