# Chess auth
Микросервис авторизации

## API

### HTTP запросы

| Тип | URI| Описание | Тело запроса|
| :--- | :--- | :--- | :--- |
|POST| `/login` | Войти под логином и паролем. Получить JWT-токены в куки в случае успеха | login — логин    password — пароль |
|POST| `/logout` | Выйти из аккаунта | — |
|POST| `/registration` | Регистрация | login — логин    password — пароль |
|POST| `/refresh` | Обновить JWT-токены | — |
