import Button from "../../components/button/button";

type CheckoutProps = {
  bookingId: number;
};
const CheckoutButton: React.FC<CheckoutProps> = ({ bookingId }) => {
  console.log(bookingId);

  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
};

export default CheckoutButton;
