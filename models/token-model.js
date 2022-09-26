import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { User } from "./auth-model.js";

const Token = sequelize.define('Token', {
    token: {type: DataTypes.STRING, primaryKey: true, unique: true},
    expiresAt: {type: DataTypes.DATE},
},
{timestamps: false}
);

User.hasOne(Token)



class TokenModel{
    async addToken(token, expiresAt, UserId){
        await Token.create({token, expiresAt, UserId})
    }
    async hasToken(token){
        return !!await Token.findOne({
            where:{token}
        })
    }
    async removeToken(token){
        await Token.destroy({
            where:{token}
        })
    }
}

export default new TokenModel()
