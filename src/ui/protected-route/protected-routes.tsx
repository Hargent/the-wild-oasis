import Spinner from "../../components/spinner/spinner";
import styled from "styled-components";
import { useEffect } from "react";
import useGetUser from "../../features/authentication/hooks/use-get-user";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const FullPageSpinner = styled.div`
  height: 100vh;
  background-color: var(--ccolor-grey-50);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isGettingUser, isAuthenticated } = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, isGettingUser, navigate]);
  if (isGettingUser) {
    return (
      <FullPageSpinner>
        <Spinner />
      </FullPageSpinner>
    );
  }

  if (isAuthenticated) return children;
};
export default ProtectedRoute;
