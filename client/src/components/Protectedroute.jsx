import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To store the authentication status
  const [loading, setLoading] = useState(true); // To handle loading state

  // Function to verify the token by calling the API
  const verifyToken = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include', // To include cookies with the request
      });

      const data = await response.json();
      
      if (data.authentication) {
        setIsAuthenticated(true); // Set user as authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsAuthenticated(false); // Handle any errors as authentication failure
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  // Call verifyToken when the component mounts
  useEffect(() => {
    verifyToken();
  }, []);

  // Show a loading indicator while verifying
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader or spinner
  }

  // Redirect to sign-in page if the user is not authenticated
  if (!isAuthenticated) {
    console.log("No user logged in, redirecting to /signin");
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
