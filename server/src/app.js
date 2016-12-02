import http from 'http';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import socketIO from 'socket.io';

export function getApp() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const server = http.Server(app);
    const io = socketIO(server);
    return { app, server, io };
}
