import { useState } from 'react';

const Popup = ({ user, onClose , onUpdate}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profile, setProfile] = useState(user.profile || '');
  const [imagePreview, setImagePreview] = useState(user.profile); // Initial profile image preview
  const [message, setMessage] = useState(''); // State for success or error messages

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file); // Update the profile image file
      setImagePreview(URL.createObjectURL(file)); // Show the preview of the selected image
    }
  };

  const handleSave = async () => {
    // Construct the form data
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('username', username);
    formData.append('email', email);
    if (profile instanceof File) formData.append('profile', profile);

    try {
      const res = await fetch('/api/admin/updateusers', {
        method: 'PUT',
        body: formData,
      });

      const result = await res.json();
      // console.log(result);
      
      if (res.ok) {
        setMessage('User updated successfully');
        onUpdate(result.user)
      } else {
        setMessage(result.message || 'Failed to update user');
      }
    } catch (error) {
      setMessage('An error occurred while updating user');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder={user.username}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder={user.email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            name="profile"
            onChange={handleImageChange}
            className="mt-1"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt={`${user.username}'s profile`}
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              className="mt-2"
            />
          )}
        </div>

        {/* Message Display */}
        {message && (
          <p className={`mt-2 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

