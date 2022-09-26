import { hash } from "bcrypt";
import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";


const ROLES = {
    USER: "usr",
    PREMIUM: "prem",
    MODERATOR: "mod"
}

export const User = sequelize.define('User', {
    id: {type: DataTypes.STRING(10), primaryKey: true, unique: true, allowNull: false},
    login: {type: DataTypes.STRING(30), unique: true, allowNull: false},
    role: {type: DataTypes.STRING(5), allowNull: false, defaultValue: ROLES.USER},
    hashedPassword: {type: DataTypes.STRING, allowNull: false},
});



class AuthModel{
    async hasUser(login){
        const result = await User.findOne({
            where:{login}
        })
        return !!result
    }
    async getUser(login){
        const user = await User.findOne({
            where: {login}
        })
        return user
    }
    async addUser(login, hashedPassword, role){
        const uncutId = await hash(login, 1)
        const id = uncutId.slice(0,10)
        const result = await User.create({
            id,
            login, 
            hashedPassword,
            role
        })
        return result
    }
    
    async removeUser(login){
        await User.destroy({
            where: {login}
        });
    }
    async updateUser(login, update){
        const user = await this.getUser(login)
        if(!user) return null
        return await user.update(update)
    }
}

export default new AuthModel()