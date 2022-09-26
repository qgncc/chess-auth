import token from "./token.js"
import authModel from "../models/auth-model.js"
import { hash, compare } from "bcrypt"
import { APIError } from "./errors.js"

class Auth{
    async login(login, password){
        const user = await authModel.getUser(login)
        if(user && await compare(password, user.hashedPassword)){
            const tokens = token.generateTokens({login: user.login,userId: user.id, role: user.role})
            return tokens
        }else{
            throw APIError.AutorizationError()
        }
    }
    async logout(refreshToken){
        const payload = await token.getVerifiedPayload(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(payload){
            const user = await authModel.getUser(payload.data.login)
            if(!user) throw new Error()
            await token.invalidateRefresh(refreshToken, user.id)
        }else{
            throw APIError.AuthecationError()
        }
    }   
    async registration(login, password){
        const hasUser = await authModel.hasUser(login)
        if(hasUser){
            throw APIError.RegistrationError()
        }
        else{
            const ROUNDS = parseInt(process.env.ROUNDS)
            const hashedPassword = await hash(password, ROUNDS)
            authModel.addUser(login, hashedPassword, "usr")
        }
    }
    async promote(login, role, accessToken){
        if(token.getVerifiedPayload(accessToken, process.env.JWT_ACCESS_SECRET)){
            authModel.updateUser(login, {role})
        }
    }
    async refresh(refreshToken){
        const payload = await token.getVerifiedPayload(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(payload){
            const data = payload.data
            const user = await authModel.getUser(data.login)
            await token.invalidateRefresh(refreshToken, user.id)
            return token.generateTokens(data)
        }else{
            throw APIError.AuthecationError()
        }
    }
}

export default new Auth()