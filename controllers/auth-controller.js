import auth from "../components/auth.js";
import { APIError } from "../components/errors.js";
import { validationResult } from "express-validator"
import config from "../config.js";

class AuthController{
    async login(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                throw APIError.BadRequest(errors)
            }
            const {login, password} = req.body
            const tokens = await auth.login(login, password)
            if(tokens){ 
                res.cookie("refresh", tokens.refresh, {maxAge: config.JWT_REFRESH_LIFETIME_MILLISECONDS, httpOnly: true,})
                    .cookie("access", tokens.access, {maxAge: config.JWT_ACCESS_LIFETIME_MILLISECONDS, httpOnly: true,})

                res.end()
            }
            else{
                throw APIError.AutorizationError()
            }
        } catch (error) {
            next(error)            
        }
    }
    async logout(req, res, next){
        try {
            const token = req.cookies.refresh
            await auth.logout(token);

            res.clearCookie().status(200).end()
 
        } catch (error) {
            next(error)            
        }
    }
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                throw APIError.BadRequest(errors)
            }
            const {login, password} = req.body
            await auth.registration(login, password)
            res.status(200).end() 
        } catch (error) {
            next(error)          
        }
    }
    async refresh(req, res, next){
        try {
            const refresh = req.cookies.refresh;
            const tokens = await auth.refresh(refresh)
            res.cookie("refresh", tokens.refresh, {maxAge: config.JWT_REFRESH_LIFETIME_MILLISECONDS, httpOnly: true,})
                .cookie("access", tokens.access, {maxAge: config.JWT_ACCESS_LIFETIME_MILLISECONDS, httpOnly: true,})
                .end()
        } catch (error) {
            next(error)            
        }
    }
}

export default new AuthController()