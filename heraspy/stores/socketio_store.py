from socketIO_client import SocketIO

def get_socketio_store(domain, port):

    client = SocketIO(domain, port)

    def dispatch(model_key, event, data):
        return client.emit(
            event,
            {
                'model': model_key,
                'data': data
            }
        )

    def on(evt, handler):
        return client.on(evt, handler)

    return {
        'dispatch': dispatch,
        'on': on
    }
