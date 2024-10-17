

import { useState } from 'react';
import {Link} from 'react-router-dom'

const Signup = () => {
  const [loading,setLoading]=useState(false)
  // const [error,setError]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMessage('')
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('passwords do not match')
      setLoading(false)
    } else {
      try {
        // Make the POST request to the backend
        const res = await fetch('/api/auth/signup', {
          method: 'POST', // HTTP method
          headers: {
            'Content-Type': 'application/json', // Tell the server you're sending JSON data
          },
          body: JSON.stringify(formData), // Convert form data to JSON
        });
  
        if (!res.ok) {
          const errorData = await res.json(); // Parse error response
          if (res.status === 409) {
            setErrorMessage(errorData.message);  // Show specific error message for 409
          } else {
            setErrorMessage(`An error occurred: ${errorData.message || 'Unknown error'}`);
          }
          setLoading(false); // Stop loading
          return;
        }
  

        setLoading(false)
        // setError(false)
      }catch (error) {
        // setError(true)
        if (error.response && error.response.status === 409) {
            // Capture the backend message and show it
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage('An error occurred. Please try again.');
        }
    }
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
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

          {/* Submit Button */}
          <button
          disabled={loading}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            {loading?'loading...':'Sign up'}
          </button>
        </form>
       

        <p>Already have a account ? <Link to='/signin'> Sign in</Link></p>
      </div>
    </div>
  );
};

export default Signup
