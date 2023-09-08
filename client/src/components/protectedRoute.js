import { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/userAPIcalls";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const getCurrentUser = () => {
    try {
      const response = GetCurrentUser();
      if (response.success) {
        return true;
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
