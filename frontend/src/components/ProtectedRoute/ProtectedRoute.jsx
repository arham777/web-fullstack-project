import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      const username = localStorage.getItem("username");

      if (!accessToken || !refreshToken || !username) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expired, try to refresh
          try {
            const response = await axios.post("http://localhost:8000/api/token/refresh/", {
              refresh: refreshToken
            });
            localStorage.setItem("access_token", response.data.access);
            setIsValid(true);
          } catch (error) {
            console.error("Error refreshing token:", error);
            setIsValid(false);
          }
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValid(false);
      }
      setIsValidating(false);
    };

    validateToken();
  }, []);

  if (isValidating) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
