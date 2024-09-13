import { Router } from "express";
import user_model from "../Models/user_schema.js";
import bcrypt from "bcrypt"
import { chagepassword, createAccount,get_all_messages,Login, store_sms } from "../Controlers/controlers.js";

const userRoutr = Router();

userRoutr.post('/createaccount',createAccount);
userRoutr.post('/login',Login);
userRoutr.post('/change_password',chagepassword);
userRoutr.post('/store/sms',store_sms)
userRoutr.get('/all/message',get_all_messages)
userRoutr.get('/ping',(req,res)=>{
    res.send('pong, srever is runing')
})

export default userRoutr;
