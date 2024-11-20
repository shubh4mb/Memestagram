// models/Meme.js
import mongoose from 'mongoose'


const memeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }, // Path or URL to the image
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who uploaded it
  createdAt: { type: Date, default: Date.now },
});

const Meme = mongoose.model('Meme',memeSchema)
 export default Meme
