import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UsersMemes = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState('');
  const [username,setUsername]=useState('')
  const { id } = useParams();

  useEffect(() => {

    const fetchMemes = async () => {
      try {
        const response = await fetch(`/api/user/getUserMemes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch memes');
        }
        const data = await response.json();
        setMemes(data.memes);
        setUsername(data.username)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemes();
  }, []);



  return (
    <div className="container mx-auto p-4">
      {error && <p>{error}</p>}
      <h1 className="text-3xl font-bold mb-6">{username}</h1>
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
 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersMemes;
