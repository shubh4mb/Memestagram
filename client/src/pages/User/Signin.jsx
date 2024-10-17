// import React from 'react'
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous errors before new attempt

    try {
      const res = await fetch('/api/auth/signin', { // Fixed endpoint typo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse error response
        if (res.status === 404 || res.status === 401) {
          setErrorMessage(errorData.message); // Show the backend error message
        } else {
          setErrorMessage(`An error occurred: ${errorData.message || 'Unknown error'}`);
        }
        setLoading(false); // Stop loading
        return;
      }

      // If the request is successful
      const data = await res.json();
      if(data.success===false){
        setErrorMessage('soemthing went wrong')
        return;
      }
      console.log('User logged in successfully:', data);
      navigate('/')
      // Post-login logic can be added here, like redirecting to another page

      setLoading(false);

    } catch (error) {
      console.error('Network error:', error); // Handles network errors
      setErrorMessage('A network error occurred. Please try again.');
      setLoading(false); // Stop loading after catch
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <p>{errorMessage}</p>
          <form onSubmit={handleSubmit}>

            {/* Username or Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                Username or Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Enter your username or email"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
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

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-4">Dont have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </>
  );
};

export default Signin;
