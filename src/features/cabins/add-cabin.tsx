import Button from "../../components/button/button";
import CreateCabinForm from "./create-cabin-form";
import Modal from "../../ui/modal/modal";
import React from "react";

const AddCabin: React.FC = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
// const AddCabin: React.FC = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const handleIsOpenModal = () => {
//     setIsOpenModal((val: boolean) => !val);
//   };
//   return (
//     <div>
//       {isOpenModal ? (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm closeForm={() => setIsOpenModal(false)} />
//         </Modal>
//       ) : (
//         <Button onClick={handleIsOpenModal}>Add new cabin</Button>
//       )}
//     </div>
//   );
// };

export default AddCabin;
