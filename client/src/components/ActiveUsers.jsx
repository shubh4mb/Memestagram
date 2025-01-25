import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    // Function to fetch active users
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch('/api/user/active', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch active users');
        }
        const data = await response.json();
        console.log(data);
        setActiveUsers(data);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };

    // Initial fetch
    fetchActiveUsers()
    
  }, []);

  return (
    <div className="bg-white  p-4 w-80">
      <h2 className="text-lg font-semibold mb-6 text-center">Active Users</h2>
      <div className="divide-y divide-gray-100">
        {activeUsers.map((user) => (
          <Link to={`/usersmemes/${user._id}`} key={user._id} className="block">
            <div className="py-3 px-2 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.profile ? `http://localhost:3007${user.profile}` : '/default-avatar.png'}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{user.username}</span>
                    <span className="text-xs text-gray-500">{user.memeCount} memes</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {activeUsers.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">No active users at the moment</p>
        )}
      </div>
    </div>
  );
};

export default ActiveUsers;
