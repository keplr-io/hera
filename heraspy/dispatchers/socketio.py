from socketIO_client import SocketIO, LoggingNamespace

def get_socketio_dispatcher(domain, port, debug=False):

    if debug is True:
        init_logging()

    client = SocketIO(domain, int(port), LoggingNamespace)

    def dispatch(model_key, event, data):
        return client.emit(
            event,
            {
                'model': model_key,
                'data': data
            }
        )

    return dispatch

def init_logging():
    import logging
    logging.getLogger('socketIO-client').setLevel(logging.DEBUG)
    logging.basicConfig()
