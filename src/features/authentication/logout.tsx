import ButtonIcon from "../../components/button-icon/button-icon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../components/spinner-mini/spinner-mini";
import useLogout from "./hooks/use-logout";

const Logout = () => {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};
export default Logout;
