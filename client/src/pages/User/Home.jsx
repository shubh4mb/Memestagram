// import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';





const memes = [
  {
    id: 1,
    username: 'TechGuru',
    title: 'Some true facts',
    imageUrl: 'https://th.bing.com/th/id/R.cea2911d2bc08200949bb894ff56108b?rik=ENB2tmCkpLvK5w&riu=http%3a%2f%2fwww.dailymoss.com%2fwp-content%2fuploads%2f2018%2f01%2fca4794cfada458717c7aa99093a1f425.jpg&ehk=u3DN2DE43FmkBV5%2fYw2LekUq9HKi6D7KNG2P35AobrI%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
  },
  {
    id: 2,
    username: 'DevDude',
    title: 'Beginners thought',
    imageUrl: 'https://www.thecoderpedia.com/wp-content/uploads/2020/06/HTML-and-CSS-Jokes.jpg',
  },
  {
    id: 3,
    username: 'CodeNinja',
    title: 'Sometimes still cant!!',
    imageUrl: 'https://th.bing.com/th/id/OIP.KB_-Q7nDNYvqRP5BwWPmiQHaGO?rs=1&pid=ImgDetMain',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const authenticated=useSelector((state)=>state.user.currentUser)
  useEffect(() => {
    // If admin is already authenticated, redirect to admin dashboard
    if (authenticated) {
      navigate('/memehome');
      // console.log('hisomthinng');
      
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Memes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <div key={meme.id} className="bg-white rounded-lg shadow-md overflow-hidden h-80">
            <img 
              src={meme.imageUrl} 
              alt={meme.title} 
              className="w-full h-48 object-contain" 
            />
            <div className="pt-8 pl-4">
              <h2 className="text-xl font-semibold">{meme.title}</h2>
              <p className="text-gray-600">Posted by: {meme.username}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center pt-12 font-bold">Sign in to view more memes </p>
    </div>
  );
};

export default Home;