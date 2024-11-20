import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile: e.target.files[0] }); // Store file in state
    setPreview(URL.createObjectURL(e.target.files[0])); // For previewing the image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Create a FormData object and append form fields
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profile', formData.profile); // Append profile image file

      // Make the POST request to the backend
      const res = await fetch('/api/admin/createuser', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include', // Send FormData object
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 409) {
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage(`An error occurred: ${errorData.message || 'Unknown error'}`);
        }
        setLoading(false);
        
        return;
      }

      // Success case
      navigate('/admin/home')
      setLoading(false);
      // Optionally redirect the user or reset the form
    } catch (error) {
      console.error(error)
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create User</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Pic */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
            <input type="file" name="profile" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" width="100" />} {/* Image preview */}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            {loading ? 'Loading...' : 'Create user'}
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default Signup;
