import tokenModel from "../models/token-model.js"
import jwt from "jsonwebtoken"
import config from "../config.js"

class Token{
    generateTokens(data){
        const refresh = jwt.sign({data}, process.env.JWT_REFRESH_SECRET, {expiresIn: config.JWT_REFRESH_LIFETIME_MILLISECONDS/1000})
        const access = jwt.sign({data}, process.env.JWT_ACCESS_SECRET, {expiresIn: config.JWT_REFRESH_LIFETIME_MILLISECONDS/1000})
        return {refresh, access}
    }
    async invalidateRefresh(token,userId){
        const payload = jwt.decode(token)
        await tokenModel.addToken(token,payload.exp*1000, userId)
    }
    getPayload(token){
        try {
            return jwt.decode(token, secret)
        } catch (error) {
            return null
        }
    }
    async getVerifiedPayload(token, secret){
        try {
            //throws error if token invalid
            const verified = jwt.verify(token, secret)
            if(!await tokenModel.hasToken(token)){
                return verified
            }else{
                return null
            }
        } catch (e) {
            return null            
        }
    }
    
}

export default new Token()