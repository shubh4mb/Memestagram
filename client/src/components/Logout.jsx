// import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/UserSlice'; // Adjust the path based on your userSlice
import { persistor } from '../redux/store'; // Import persistor if needed for clearing redux-persist

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call the backend to clear the cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Make sure to include credentials to send cookies
      });

      const data = await response.json();
     
      if (response.ok) {
        console.log(data.message); // 'Logout successful.'

        // Clear the Redux store
        dispatch(logout());

        // Clear the persisted data (if you're using redux-persist)
        await persistor.purge();

        console.log("Redux store and persisted data cleared");

        // Redirect the user to the sign-in page or home page
        window.location.href = '/';
      } else {
        console.error('Failed to log out:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className='text-white'>
      Logout
    </button>
  );
};

export default LogoutButton;
