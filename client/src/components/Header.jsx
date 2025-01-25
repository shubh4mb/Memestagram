import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import { useSelector } from 'react-redux';
import { FaHome, FaPlus, FaUser, FaSignInAlt, FaImages } from 'react-icons/fa';

const Header = () => {
  const [loading, setLoading] = useState(true); // Loading state to manage API call
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux

  // Function to call the API to check authentication
  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include', // Include cookies if the token is in cookies
      });

      const data = await response.json();

      if (data.authentication) {
        // If authenticated, update the Redux store if necessary
        // You can dispatch an action to set the username or user details
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  // Call the API when the component mounts
  useEffect(() => {
    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loader or spinner while checking authentication
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="text-white text-2xl" />
            <span className="text-white text-2xl font-bold tracking-tight hover:text-purple-200 transition duration-300">
              Memestagram
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/addmeme"
              className="flex items-center space-x-1 text-white hover:text-purple-200 transition duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <FaPlus className="text-lg" />
              <span>Post</span>
            </Link>

            {!currentUser ? (
              <Link
                to="/signin"
                className="flex items-center space-x-1 text-white hover:text-purple-200 transition duration-300 px-4 py-2 rounded-lg border border-white/30 hover:border-white/50"
              >
                <FaSignInAlt className="text-lg" />
                <span>Sign in</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-white hover:text-purple-200 transition duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <FaUser className="text-lg" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to='/memesposted'
                  className="flex items-center space-x-1 text-white hover:text-purple-200 transition duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <FaImages className="text-lg" />
                  <span>My Posts</span>
                </Link>
                <div className="pl-2 border-l border-white/30">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
