from socketIO_client import SocketIO, LoggingNamespace

def get_socket_dispatcher(domain, port):

    socket_client = SocketIO(
        domain,
        port,
        LoggingNamespace
    )

    def dispatch(namespace, event, data):
        return socket_client.emit(
            event,
            data,
            namespapce=namespace
        )

    return dispatch