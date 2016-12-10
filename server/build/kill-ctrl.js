'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.applyKillControl = applyKillControl;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function applyKillControl(app) {
    /**
     * Storing state this way makes it impossible to parallelize.
     *
     * The correct solution is to store this some database,
     * but this requires users of the library to setup a
     * local in-memory database.
     *
     * TODO: make this local state optional,
     * and generically support storing this in some database
     * (via read/write functions passed as argument)
     */

    var appState = {
        shouldKillModel: {}
    };

    app.get('/kill-list', function (req, res) {
        res.json(appState.shouldKillModel);
    });

    app.post('/schedule-kill', function (req, res) {
        Object.assign(appState.shouldKillModel, _defineProperty({}, req.body.model, true));
        res.send('killing ' + req.body.model + ' on next epoch');
    });

    app.post('/kill', function (req, res) {
        Object.assign(appState.shouldKillModel, _defineProperty({}, req.body.model, false));
        res.send('killed ' + req.body.model);
    });

    return app;
}
