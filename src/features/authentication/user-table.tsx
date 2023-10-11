import Button from "../../components/button/button";
import Menus from "../../ui/menus/menus";
import Modal from "../../ui/modal/modal";
import SignupForm from "./signup-form";
import Spinner from "../../components/spinner/spinner";
import Table from "../../ui/table/table";
import useGetAllUsers from "./hooks/use-get-all-users";
import { UserData } from "../../utils/types/user";
import UserRow from "./user-row";

// import Pagination from "../../ui/pagination/pagination";

function UsersTable() {
  const { isLoadingUsers, allUsers } = useGetAllUsers();

  console.log(allUsers);

  const userRowData = allUsers?.map((user) => {
    return {
      email: user.email,
      name: user.user_metadata.fullName,
      avatar: user.user_metadata.avatar,
      lastSignIn: user.last_sign_in_at,
      phone: user.user_metadata.phone
    };
  });

  console.log(userRowData);

  if (isLoadingUsers) return <Spinner />;

  return (
    <Menus>
      <Modal>
        <Table columns="1fr 1fr 2.5fr 1.5fr 1.5fr 0.5fr">
          <Table.Header>
            <div></div>
            <div>Full name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Last Sign in</div>
            <div>Status</div>
          </Table.Header>

          <Table.Body
            data={userRowData as UserData[]}
            render={(renderData: UserData) => (
              <UserRow key={renderData.id} userData={renderData} />
            )}
          />
          <Table.Footer>
            <></>
            {/* <Pagination count={count ? count : 0} /> */}
          </Table.Footer>
        </Table>
        <Modal.Open opens="create-user">
          <Button>Create New User</Button>
        </Modal.Open>

        <Modal.Window name="create-user">
          <SignupForm />
        </Modal.Window>
      </Modal>
    </Menus>
  );
}

export default UsersTable;
