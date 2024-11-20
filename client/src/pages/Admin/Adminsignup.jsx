import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminlogin } from '../../redux/admin/AdminVerifyThunk.js';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access loading and error states from the Redux store
    const { loading, error, isAuthenticated } = useSelector((state) => state.admin);

    useEffect(() => {
      // If admin is already authenticated, redirect to admin dashboard
      if (isAuthenticated) {
        navigate('/admin/home');
        // console.log('hisomthinng');
        
      }
    }, []);

    const submitform = (e) => {
        e.preventDefault();
        dispatch(adminlogin({ username, password }))
            .unwrap()
            .then(() => {
                navigate('/admin/home');
            })
            .catch((err) => {
                console.error('Login failed:', err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4 text-center">Admin Sign In</h2>
            
            {error && (
                <div className="mb-4 text-red-500 flex flex-col items-center">
                    <img 
                        src="http://localhost:3007/uploads/Loginwrong.jpg" // Replace with the path to your error image
                        alt="Error"
                        className="w-32 h-32 mb-2" // Adjust the size as needed
                    />
                    <span>{error}</span>
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            
            <button
                onClick={submitform}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={loading} // Disable button when loading
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    </div>
    
    );
};

export default AdminLogin;
