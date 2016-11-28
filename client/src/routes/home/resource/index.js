export const scheduleKillReq = model =>
    fetch(`${HERA_HOST}/schedule-kill`, {
        method: 'post',
        body: JSON.stringify({ model }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
