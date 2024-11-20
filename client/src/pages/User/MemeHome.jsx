
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MemeHome = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('/api/user/getAllMemes');
        if (!response.ok) {
          throw new Error('Failed to fetch memes');
        }
        const data = await response.json();
        setMemes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="container mx-auto ">
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <h1 className="text-3xl font-bold text-center mb-6">Memes</h1>
  
    <div className="flex space-x-4 ">
      {/* Left Section */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Left Sidebar</h2>
        <p>Additional content or navigation</p>
      </div>
  
      {/* Center Section - Memes */}
      <div className="w-full">
        {memes.map((meme) => (
          <div key={meme.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <img 
              src={`http://localhost:3007${meme.image}`} 
              alt={meme.title} 
              className="w-full h-[70vh] object-contain rounded-t-lg" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meme.title}</h2>
            <Link to={`/usersmemes/${meme.user._id}`}> <p className="text-gray-600">Posted by: {meme.user.username}</p></Link>
             
            </div>
          </div>
        ))}
      </div>
  
      {/* Right Section */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Right Sidebar</h2>
        <p>Additional content or ads</p>
      </div>
    </div>
  </div>
  
  
  );
};

export default MemeHome;