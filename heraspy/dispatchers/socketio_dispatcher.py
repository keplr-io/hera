from socketIO_client import SocketIO, BaseNamespace

def get_socket_dispatcher(model_key, domain, port):

    nsp = SocketIO(domain, port)

    def dispatch(model_key, event, data):
        return nsp.emit(
            event,
            {
                'model': model_key,
                'data': data
            }
        )

    return dispatch