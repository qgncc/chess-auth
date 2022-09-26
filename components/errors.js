export class APIError extends Error{
    constructor(message, status, errors = []){
        super(message)
        this.status = status
        this.errors = errors
    }

    static AutorizationError(){
        return new APIError("Неправильный логин/пароль", 400)
    }
    static RegistrationError(){
        return new APIError("Пользователь с таким логином уже существует", 400)
    }
    static AuthecationError(){
        return new APIError("Отсутствуют необходимые права для запроса", 403)
    }
    static BadRequest(errors){
        return new APIError("Ошибка валидации", 400, errors)
    }
}