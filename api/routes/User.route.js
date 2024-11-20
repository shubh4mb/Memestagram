import express from 'express'
import {test,memehome,profile,updateProfile,addMeme,getMemes, deleteMeme,getUserMemesById} from '../controllers/user.controller.js'
import { authenticateJWT } from '../middlewares/authenticatejwt.js'
import multer from 'multer';
import { getUserMemes } from '../middlewares/MemesGet.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });
  const upload = multer({ storage });

const router = express.Router();

router.get('/',test)
router.get('/memehome',authenticateJWT,memehome)
router.get('/profile',authenticateJWT,profile)
router.put('/updateProfile', authenticateJWT, updateProfile);
router.post('/addmeme',authenticateJWT,upload.single('image'),addMeme)
router.get('/getAllMemes',authenticateJWT,getMemes)
router.get('/getUserMemes',authenticateJWT,getUserMemes,getMemes)
router.get('/getUserMemes/:id',authenticateJWT,getUserMemesById)

router.delete('/deletememe/:id',authenticateJWT,deleteMeme)








export default router

