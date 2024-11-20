import express from 'express'
import {signup} from '../controllers/auth.controller.js'
import {signin,verify,logoutUser} from '../controllers/auth.controller.js'
import { authenticateJWT } from '../middlewares/authenticatejwt.js'



const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/verify',authenticateJWT,verify)
router.post('/logout',logoutUser)

export default router