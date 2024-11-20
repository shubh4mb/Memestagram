// Import dependencies
import { useState, useEffect } from "react";
import Popup from '../../components/Popup'; // Assuming Popup is already created

const Adminhome = () => {
  const [users, setUsers] = useState([]); // Initialize state to an empty array
  const [popup, setPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for editing

  // Function to update the user in the users' list
  const updateUserDetails = (updatedUser) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  // Show the popup modal and set the selected user
  const onEdit = (user) => {
    setSelectedUser(user);
    setPopup(true);
  };

  // Hide the popup modal
  const onClosePopup = () => {
    setPopup(false);
    setSelectedUser(null);
  };

  // Function to delete the user from both backend and frontend state
  const onDelete = async (userId) => {
    try {
      const res = await fetch(`/api/admin/deleteuser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }

      // Remove the user from the state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch('/api/admin/getusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data); // Update state with fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers(); // Call the function to fetch users when component mounts
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Home</h1>
      <h2 className="text-xl mb-2">List of Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Profile</th> {/* New Profile column */}
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={`http://localhost:3007${user.profile}`} // Assuming the 'profile' field contains the image URL
                      alt={`${user.username}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => onEdit(user)} // Pass the user details to the modal
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user._id)} // Use _id for the delete function
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center border-b">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {popup && (
        <Popup user={selectedUser} onClose={onClosePopup} onUpdate={updateUserDetails} />
      )}
    </div>
  );
};

export default Adminhome;
