import { getApp } from './app';
import { applyKillControl } from './kill-ctl';
import { applySocketIOControl } from './socketio-ctl';

const { app, server } = getApp();
applyKillControl(app);
applySocketIOControl(app, server);

server.listen(4000);
