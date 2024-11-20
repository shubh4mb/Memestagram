import { useState } from 'react';
// import { useSelector } from 'react-redux';

const AddMeme = () => {
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);

    try {
      const res = await fetch('/api/user/addmeme', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include', // Send cookies for auth
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to upload meme');
      } else {
        alert('Meme uploaded successfully');
        setFormData({ title: '', description: '', image: null });
        setPreview('');
      }
    } catch (err) {
      console.error(err,'error working')
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Meme</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter meme title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter description (optional)"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full"
            />
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none"
          >
            {loading ? 'Uploading...' : 'Upload Meme'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeme;
