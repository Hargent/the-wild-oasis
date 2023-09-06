import { HiSquare2Stack, HiTrash } from "react-icons/hi2";

import ButtonGroup from "../../components/button-group/button-group";
import ButtonIcon from "../../components/button-icon/button-icon";
import { CabinData } from "../../utils/types/cabin";
import ConfirmDelete from "../../ui/confirm-delete/confirm-delete";
import EditCabinForm from "./edit-cabin-form";
import { FiEdit } from "react-icons/fi";
import Modal from "../../ui/modal/modal";
import { formatCurrency } from "../../utils/helpers/helpers";
import styled from "styled-components";
import useCreateCabin from "./hooks/use-create-cabin";
import useDeleteCabin from "./hooks/use-delete-cabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type Props = {
  cabinData: CabinData;
};
const CabinRow: React.FC<Props> = ({ cabinData }) => {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabinData;

  // console.log(img);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    });
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount || discount === 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <ButtonGroup>
        <ButtonIcon onClick={handleDuplicateCabin} disabled={isCreating}>
          <HiSquare2Stack />
        </ButtonIcon>
        <Modal>
          <Modal.Open opens="edit-form">
            <ButtonIcon>
              <FiEdit />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="edit-form">
            <EditCabinForm cabinEditData={cabinData} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="confirm-delete">
            <ButtonIcon>
              <HiTrash />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </TableRow>
  );
};
export default CabinRow;
