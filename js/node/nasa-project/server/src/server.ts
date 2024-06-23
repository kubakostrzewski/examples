import app from "./app";
import * as http from "http";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})
