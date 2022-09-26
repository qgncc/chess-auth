import { APIError } from "../components/errors.js";

export default function errorHandler(err, req, res, next){
    if(err instanceof APIError){
        res.status(err.status).send(JSON.stringify({message: err.message, errors: err.errors})).end()
    }else{
        console.log(err)
        res.status(500).send(JSON.stringify({message: "Server error. Sorry"})).end()
    }
}