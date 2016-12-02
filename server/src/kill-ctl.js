export function applyKillControl (app) {
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

    const appState = {
        shouldKillModel: {}
    };

    app.get('/kill-list', (req, res) => {
        res.json(appState.shouldKillModel);
    });

    app.post('/schedule-kill', (req, res) => {
        Object.assign(
            appState.shouldKillModel,
            { [req.body.model]: true }
        );
        res.send(`killing ${req.body.model} on next epoch`);
    });

    app.post('/kill', (req, res) => {
        Object.assign(
            appState.shouldKillModel,
            { [req.body.model]: false }
        );
        res.send(`killed ${req.body.model}`);
    });

    return app;
}
