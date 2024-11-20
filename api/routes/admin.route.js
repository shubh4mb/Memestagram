import express from 'express'
import {  adminlogin, createuser, deleteuser, getUsers, logoutAdmin, updateuser, verify,getMemes } from '../controllers/admin.controllers.js'
import { authenticateJWT } from '../middlewares/adminJWTAuth.js'


const router = express.Router()

// router.get('/home', adminhome)
router.post('/login',adminlogin)
router.get('/getusers',getUsers)
router.put('/updateusers', updateuser)
router.delete('/deleteuser/:id',deleteuser)
router.post('/createuser',createuser)
router.post('/logout',logoutAdmin)
router.get('/verify',authenticateJWT,verify)
router.get('/getAllMemes',authenticateJWT,getMemes)

export default router