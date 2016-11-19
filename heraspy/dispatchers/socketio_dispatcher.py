from socketIO_client import SocketIO, BaseNamespace

def get_socket_dispatcher(namespace, domain, port):

    nsp = SocketIO(domain, port)

    def dispatch(namespace, event, data):
        return nsp.emit(
            event,
            data,
        )

    return dispatch