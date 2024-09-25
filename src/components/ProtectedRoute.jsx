import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayour";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("userData1");

  return token ? (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
