import { useEffect, useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    username: '',
    email: '',
    profile: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
        setUpdatedData({
          username: data.username,
          email: data.email,
          profile: data.profile,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('username', updatedData.username);
      formData.append('email', updatedData.email);
      if (updatedData.profile instanceof File) {
        formData.append('profile', updatedData.profile);
      }
      const response = await fetch(`/api/user/updateProfile`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error updating profile');
      }
      const updatedUser = await response.json();
      setProfileData(updatedUser.user);
      if (updatedData.profile instanceof File) {
        const newImageUrl = URL.createObjectURL(updatedData.profile);
        setProfileData((prevData) => ({ ...prevData, profile: newImageUrl }));
      }
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error(`Error updating profile:`, error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedData({ ...updatedData, profile: file });
    setImagePreview(URL.createObjectURL(file)); // Show preview of selected image
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">{profileData.username}'s Profile</h1>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        {isEditing ? (
          <>
            <input type="file" name="profile" onChange={handleImageChange} className="mb-4" />
            <img
              src={imagePreview || profileData.profile}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full border border-gray-300 object-cover"
            />
          </>
        ) : (
          <img
            src={profileData.profile}
            alt={`${profileData.username}'s profile`}
            className="w-32 h-32 rounded-full border border-gray-300 object-cover"
          />
        )}
      </div>

      {/* Profile Details */}
      <div className="mb-4">
        <label className="block font-semibold">Username:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={updatedData.username}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full mt-2"
          />
        ) : (
          <p className="text-gray-700">{profileData.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2 w-full mt-2"
          />
        ) : (
          <p className="text-gray-700">{profileData.email}</p>
        )}
      </div>

      {/* Edit and Save Buttons */}
      <div className="text-center mt-6">
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
