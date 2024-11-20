import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import { useSelector } from 'react-redux';
// import { increment , decrement } from '../redux/user/UserSlice';

const Header = () => {
  const [loading, setLoading] = useState(true); // Loading state to manage API call
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  // const count=useSelector((state)=>state.user.count);
  // console.log(count);
  
  // const dispatch=useDispatch()

  
  
  // Function to call the API to check authentication
  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include', // Include cookies if the token is in cookies
      });

      const data = await response.json();
      // console.log(data);

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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-2xl font-bold">
            Memestagram
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/addmeme"
            className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
          >
            + Post
          </Link>

          {!currentUser  ? (
            <Link
              to="/signin"
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
            >
              Sign in
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Edit Profile
              </Link>
              <Link 
              to='/memesposted'
              className='text-white'>
              View Posts
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
