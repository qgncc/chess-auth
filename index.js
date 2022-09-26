import { createServer } from 'http';
import app from "./pipeline.js"
import { config } from "dotenv";
config()

const port = process.env.PORT || 5000;
const host = "localhost";

const server = createServer(app);

async function start() {
    try{
        server.listen(port,host, () => {
            console.log(`Server runs at http://${host}:${port}`);
        });

    }catch (e) {
        console.log(e);
    }
}

start()
