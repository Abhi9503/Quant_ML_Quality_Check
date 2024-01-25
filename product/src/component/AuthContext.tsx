import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import frappe from "frappe"; // Import the Frappe client library or use the appropriate import

const useAuth = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle login with Frappe authentication
  const login = async () => {
    try {
      // Perform authentication logic with Frappe (adjust this based on your authentication method)
      const response = await frappe.login({
        // Your authentication parameters
      });

      // Assuming Frappe returns user information upon successful login
      const user = response.user;

      // Set user information in the state or context
      setUser(user);

      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage("Authentication failed: " + error.message);
    }
  };

  // Handle logout
  const logout = () => {
    // Perform logout logic with Frappe (adjust this based on your logout method)
    frappe.logout();

    // Update state/context to reflect the logout
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check user authentication status (you may need to adjust this based on your Frappe setup)
    const checkAuthentication = async () => {
      try {
        const user = await frappe.getMe(); // Replace with your method to get current user

        if (user) {
          setUserName(user.full_name); // Assuming the user object has a "full_name" property
          setIsLoggedIn(true);
        } else {
          setUserName(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    // Call the checkAuthentication function
    checkAuthentication();
  }, []);

  return {
    isLoggedIn,
    userName,
    login,
    logout,
  };
};

export default useAuth;
