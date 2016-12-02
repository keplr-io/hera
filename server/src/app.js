import http from 'http';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';

export function getApp() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const server = http.Server(app);

    return { app, server };
}
