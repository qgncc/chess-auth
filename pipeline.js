import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import authController from './controllers/auth-controller.js';
import cors from 'cors'
import errorHandler from './middleware/error-handler.js';
import { body } from 'express-validator'
import config from './config.js';

const {MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH} = config


const app = express();
app.use(cors())
app.use(json());
app.use(cookieParser())
app.use((req, res, next)=>{
    console.log(req.url)
    console.log(req.body)
    next()
})

app.post("/login",
            body("login").isLength({ min:MIN_LOGIN_LENGTH,  max:MAX_LOGIN_LENGTH}), 
            body("password").isLength({ min:MIN_PASSWORD_LENGTH,  max:MAX_PASSWORD_LENGTH}), 
            authController.login);
app.post("/registration",
            body("login").isLength({ min:MIN_LOGIN_LENGTH,  max:MAX_LOGIN_LENGTH}), 
            body("password").isLength({ min:MIN_PASSWORD_LENGTH,  max:MAX_PASSWORD_LENGTH}), 
            authController.registration);
app.post("/refresh", authController.refresh);
app.post("/logout", authController.logout);
app.use(errorHandler)

export default app;