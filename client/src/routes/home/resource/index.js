export const scheduleKillReq = model =>
    fetch('http://localhost:4000/schedule-kill', {
        method: 'post',
        body: JSON.stringify({ model }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
