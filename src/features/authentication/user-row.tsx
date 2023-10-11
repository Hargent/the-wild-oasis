import styled from "styled-components";
import Table from "../../ui/table/table";
import { UserData } from "../../utils/types/user";
import Tag from "../../components/tag/tag";
import { statusToTagName } from "../../utils/constants/status-to-tag";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Phone = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
type Props = {
  userData: UserData;
};
const UserRow: React.FC<Props> = ({ userData }) => {
  const { email, name, avatar, lastSignIn, phone } = userData;

  {
    /* <TableRow role="row"> */
  }
  console.log(avatar);

  let status: string = "";
  lastSignIn ? (status = "verified") : "not-verified";
  return (
    <Table.Row>
      <Img src={avatar} />
      <User>{name}</User>

      <User>{email}</User>
      {phone ? <Phone>{phone}</Phone> : <span>&mdash;</span>}
      {lastSignIn ? <Phone>{lastSignIn}</Phone> : <span>&mdash;</span>}

      <Tag type={status as keyof typeof statusToTagName}>
        {status.replace("-", " ")}
      </Tag>
    </Table.Row>
  );
};
export default UserRow;
