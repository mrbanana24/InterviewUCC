import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyUser } from "../../utils/api";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await verifyUser(token);
        if (response.status === 200) {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    verify();
  }
  , []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;