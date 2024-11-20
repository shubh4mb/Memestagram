import { useEffect, useState } from 'react';

const MemesPosted = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('/api/user/getUserMemes');
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

  const handleDelete = async (memeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this meme?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/user/deletememe/${memeId}`, {
        method: 'DELETE',
        credentials: 'include' // include credentials for authentication
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete meme');
      }

      // Remove the deleted meme from the state to update UI
      setMemes(memes.filter((meme) => meme._id !== memeId));
      alert("Meme deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p>{error}</p>}
      <h1 className="text-3xl font-bold mb-6">Memes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <div key={meme._id} className="bg-white rounded-lg shadow-md overflow-hidden h-80">
            <img 
              src={`http://localhost:3007${meme.image}`} 
              alt={meme.title} 
              className="w-full h-48 object-contain" 
            />
            <div className="pt-8 pl-4">
              <h2 className="text-xl font-semibold">{meme.title}</h2>
              <p className="text-gray-600">Posted by: {meme._id}</p>
              <button 
                onClick={() => handleDelete(meme._id)} 
                className="mt-2 text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemesPosted;
