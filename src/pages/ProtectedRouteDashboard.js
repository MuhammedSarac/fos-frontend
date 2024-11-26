import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRouteDashboard = ({ children }) => {
  const { employee } = useSelector((store) => store.employee.employee);
  if (employee.isAdmin) {
    toast.error("Du har ikke adgang til oprette arbejdsplan");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRouteDashboard;
